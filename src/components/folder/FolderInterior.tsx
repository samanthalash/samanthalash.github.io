import { useState } from "react";
import { ContentPanel } from "./ContentPanel";
import { PageFlip } from "./PageFlip";
import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import styles from "./FolderInterior.module.css";

const FLIP_TABS: FolderSectionId[] = ["about", "archive", "experiments"];

interface FolderInteriorProps {
  activeSection: FolderSection;
  activeSectionId: FolderSectionId;
  isPending: boolean;
}

export function FolderInterior({
  activeSection,
  activeSectionId,
  isPending,
}: FolderInteriorProps) {
  const isHome = activeSection.id === "work";
  const usesPhotoTemplate = activeSection.id !== "work";
  const allowsOverflow = isHome || usesPhotoTemplate;
  const isFlipEnabled = (FLIP_TABS as string[]).includes(activeSectionId);

  // Preserve per-tab page position across tab switches
  const [pageIndices, setPageIndices] = useState<Record<string, number>>({});
  const currentPageIndex = pageIndices[activeSectionId] ?? 0;
  const handlePageChange = (index: number) => {
    setPageIndices((prev) => ({ ...prev, [activeSectionId]: index }));
  };

  const renderContent = () => {
    if (!isFlipEnabled) {
      return <ContentPanel activeSection={activeSection} />;
    }

    // To add more pages: append elements to this array
    const pages = [
      <ContentPanel activeSection={activeSection} key="page-1" />,
      <div className={styles.blankPage} key="page-2" />,
    ];

    return (
      <PageFlip
        pages={pages}
        allowOverflow={allowsOverflow}
        pageIndex={currentPageIndex}
        onPageChange={handlePageChange}
      />
    );
  };

  return (
    <div className={styles.interiorFrame} data-home={isHome}>
      <div className={styles.sheetStack} aria-hidden="true">
        <span className={styles.sheetBack} />
        <span className={styles.sheetMid} />
      </div>

      <section
        id={`panel-${activeSectionId}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeSectionId}`}
        tabIndex={0}
        data-pending={isPending}
        data-home={isHome}
        data-overflow={allowsOverflow}
        className={styles.paperSheet}
      >
        {renderContent()}
      </section>
    </div>
  );
}
