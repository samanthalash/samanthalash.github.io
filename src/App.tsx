import { useEffect, useState, useTransition } from "react";
import { FolderScene } from "./components/folder/FolderScene";
import { PortfolioGalleryOverlay } from "./components/portfolio/PortfolioGalleryOverlay";
import { DesktopScreen } from "./components/desktop/DesktopScreen";
import { LayoutEditorOverlay } from "./components/editor/LayoutEditorOverlay";
import { folderSections } from "./data/folderSections";
import { projectGalleries, type ProjectGalleryId } from "./data/projectGalleries";
import initialGalleryOverrides from "./data/galleryOverrides.json";
import { LayoutEditorProvider } from "./editor/LayoutEditorContext";
import type { FolderSectionId } from "./data/folderSections";
import type { PortfolioGalleryImage } from "./data/portfolioGallery";
import { portfolioGalleryImages } from "./data/portfolioGallery";
import styles from "./App.module.css";

const MIN_DESKTOP_VIEWPORT_WIDTH = 1100;
const PORTFOLIO_GALLERY_ID = "portfolio";

type EditableGalleryId = ProjectGalleryId | typeof PORTFOLIO_GALLERY_ID;

interface GalleryOverride {
  addedImages?: PortfolioGalleryImage[];
  removedImageIds?: string[];
}

interface GalleryOverrideDocument {
  version: 1;
  galleries: Partial<Record<EditableGalleryId, GalleryOverride>>;
}

const isSupportedViewport = () =>
  window.innerWidth >= MIN_DESKTOP_VIEWPORT_WIDTH;

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });

const normalizeGalleryOverrides = (
  document: GalleryOverrideDocument,
): GalleryOverrideDocument => ({
  version: 1,
  galleries: document.galleries ?? {},
});

const applyGalleryOverrides = (
  images: PortfolioGalleryImage[],
  galleryId: EditableGalleryId,
  overrides: GalleryOverrideDocument,
) => {
  const override = overrides.galleries[galleryId];
  const removedImageIds = new Set(override?.removedImageIds ?? []);

  return [
    ...images.filter((image) => !removedImageIds.has(image.id)),
    ...(override?.addedImages ?? []).filter(
      (image) => !removedImageIds.has(image.id),
    ),
  ];
};

function UnsupportedViewportScreen() {
  return (
    <main className={styles.unsupportedScreen}>
      <p className={styles.unsupportedMessage}>
        This portfolio is designed to be experienced on a computer screen.
        Please visit from a laptop or desktop.
      </p>
    </main>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem("introSeen"),
  );
  const [isViewportSupported, setIsViewportSupported] =
    useState(isSupportedViewport);
  const [activeSectionId, setActiveSectionId] = useState<FolderSectionId>(
    folderSections[0].id,
  );
  const [isPortfolioGalleryOpen, setIsPortfolioGalleryOpen] = useState(false);
  const [activeProjectGalleryId, setActiveProjectGalleryId] =
    useState<ProjectGalleryId>();
  const [galleryOverrides, setGalleryOverrides] =
    useState<GalleryOverrideDocument>(() =>
      normalizeGalleryOverrides(initialGalleryOverrides as GalleryOverrideDocument),
    );
  const [isPending, startTransition] = useTransition();

  const activeSection =
    folderSections.find((section) => section.id === activeSectionId) ??
    folderSections[0];
  const portfolioImages = applyGalleryOverrides(
    portfolioGalleryImages,
    PORTFOLIO_GALLERY_ID,
    galleryOverrides,
  );
  const projectGalleriesWithOverrides = Object.fromEntries(
    Object.entries(projectGalleries).map(([galleryId, gallery]) => [
      galleryId,
      {
        ...gallery,
        images: applyGalleryOverrides(
          gallery.images,
          galleryId as ProjectGalleryId,
          galleryOverrides,
        ),
      },
    ]),
  ) as typeof projectGalleries;
  const activeProjectGallery = activeProjectGalleryId
    ? projectGalleriesWithOverrides[activeProjectGalleryId]
    : undefined;
  const activeEditableGallery = isPortfolioGalleryOpen
    ? {
        id: PORTFOLIO_GALLERY_ID,
        title: "Portfolio Gallery",
        images: portfolioImages,
      }
    : activeProjectGalleryId && activeProjectGallery
      ? {
          id: activeProjectGalleryId,
          title: activeProjectGallery.title,
          images: activeProjectGallery.images,
        }
      : undefined;

  useEffect(() => {
    const handleResize = () => {
      setIsViewportSupported(isSupportedViewport());
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useEffect(() => {
    fetch("/__layout-editor/galleries")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gallery endpoint unavailable.");
        }
        return response.json() as Promise<GalleryOverrideDocument>;
      })
      .then((document) => setGalleryOverrides(normalizeGalleryOverrides(document)))
      .catch(() => {
        // The committed JSON import is enough outside the local editor endpoint.
      });
  }, []);

  const handleSectionChange = (sectionId: FolderSectionId) => {
    startTransition(() => {
      setActiveSectionId(sectionId);
    });
  };

  const handleDismiss = () => {
    sessionStorage.setItem("introSeen", "1");
    setShowIntro(false);
  };

  const mutateGalleryOverrides = async (payload: object) => {
    const response = await fetch("/__layout-editor/galleries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }

    const document = (await response.json()) as GalleryOverrideDocument;
    setGalleryOverrides(normalizeGalleryOverrides(document));
  };

  const handleUploadGalleryImage = async (
    galleryId: string,
    file: File,
  ) => {
    await mutateGalleryOverrides({
      action: "upload",
      galleryId,
      fileName: file.name,
      dataUrl: await fileToDataUrl(file),
    });
  };

  const handleRemoveGalleryImage = async (
    galleryId: string,
    imageId: string,
  ) => {
    await mutateGalleryOverrides({
      action: "remove",
      galleryId,
      imageId,
    });
  };

  if (!isViewportSupported) {
    return <UnsupportedViewportScreen />;
  }

  return (
    <LayoutEditorProvider>
      {showIntro && <DesktopScreen onDismiss={handleDismiss} />}
      <FolderScene
        sections={folderSections}
        activeSection={activeSection}
        activeSectionId={activeSectionId}
        isIntroVisible={showIntro}
        isPending={isPending}
        onSectionChange={handleSectionChange}
        onOpenPortfolioGallery={() => setIsPortfolioGalleryOpen(true)}
        onOpenProjectGallery={(galleryId) =>
          setActiveProjectGalleryId(galleryId as ProjectGalleryId)
        }
      />
      {isPortfolioGalleryOpen && (
        <PortfolioGalleryOverlay
          galleryId={PORTFOLIO_GALLERY_ID}
          images={portfolioImages}
          onClose={() => setIsPortfolioGalleryOpen(false)}
        />
      )}
      {activeProjectGallery && (
        <PortfolioGalleryOverlay
          galleryId={activeProjectGalleryId}
          title={activeProjectGallery.title}
          images={activeProjectGallery.images}
          onClose={() => setActiveProjectGalleryId(undefined)}
        />
      )}
      <LayoutEditorOverlay
        activeGallery={activeEditableGallery}
        onUploadGalleryImage={handleUploadGalleryImage}
        onRemoveGalleryImage={handleRemoveGalleryImage}
      />
    </LayoutEditorProvider>
  );
}
