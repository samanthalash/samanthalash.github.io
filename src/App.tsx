import { useState, useTransition } from "react";
import { FolderScene } from "./components/folder/FolderScene";
import { PortfolioGalleryOverlay } from "./components/portfolio/PortfolioGalleryOverlay";
import { DesktopScreen } from "./components/desktop/DesktopScreen";
import { folderSections } from "./data/folderSections";
import type { FolderSectionId } from "./data/folderSections";

export default function App() {
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem("introSeen"),
  );
  const [activeSectionId, setActiveSectionId] = useState<FolderSectionId>(
    folderSections[0].id,
  );
  const [isPortfolioGalleryOpen, setIsPortfolioGalleryOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const activeSection =
    folderSections.find((section) => section.id === activeSectionId) ??
    folderSections[0];

  const handleSectionChange = (sectionId: FolderSectionId) => {
    startTransition(() => {
      setActiveSectionId(sectionId);
    });
  };

  const handleDismiss = () => {
    sessionStorage.setItem("introSeen", "1");
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <DesktopScreen onDismiss={handleDismiss} />}
      <FolderScene
        sections={folderSections}
        activeSection={activeSection}
        activeSectionId={activeSectionId}
        isIntroVisible={showIntro}
        isPending={isPending}
        onSectionChange={handleSectionChange}
        onOpenPortfolioGallery={() => setIsPortfolioGalleryOpen(true)}
      />
      {isPortfolioGalleryOpen && (
        <PortfolioGalleryOverlay
          onClose={() => setIsPortfolioGalleryOpen(false)}
        />
      )}
    </>
  );
}
