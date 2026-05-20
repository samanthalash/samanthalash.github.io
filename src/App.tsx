import { useEffect, useState, useTransition } from "react";
import { FolderScene } from "./components/folder/FolderScene";
import { PortfolioGalleryOverlay } from "./components/portfolio/PortfolioGalleryOverlay";
import { DesktopScreen } from "./components/desktop/DesktopScreen";
import { LayoutEditorOverlay } from "./components/editor/LayoutEditorOverlay";
import { folderSections } from "./data/folderSections";
import { projectGalleries, type ProjectGalleryId } from "./data/projectGalleries";
import { LayoutEditorProvider } from "./editor/LayoutEditorContext";
import type { FolderSectionId } from "./data/folderSections";
import styles from "./App.module.css";

const MIN_DESKTOP_VIEWPORT_WIDTH = 1100;

const isSupportedViewport = () =>
  window.innerWidth >= MIN_DESKTOP_VIEWPORT_WIDTH;

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
  const [isPending, startTransition] = useTransition();

  const activeSection =
    folderSections.find((section) => section.id === activeSectionId) ??
    folderSections[0];
  const activeProjectGallery = activeProjectGalleryId
    ? projectGalleries[activeProjectGalleryId]
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

  const handleSectionChange = (sectionId: FolderSectionId) => {
    startTransition(() => {
      setActiveSectionId(sectionId);
    });
  };

  const handleDismiss = () => {
    sessionStorage.setItem("introSeen", "1");
    setShowIntro(false);
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
          onClose={() => setIsPortfolioGalleryOpen(false)}
        />
      )}
      {activeProjectGallery && (
        <PortfolioGalleryOverlay
          title={activeProjectGallery.title}
          images={activeProjectGallery.images}
          onClose={() => setActiveProjectGalleryId(undefined)}
        />
      )}
      <LayoutEditorOverlay />
    </LayoutEditorProvider>
  );
}
