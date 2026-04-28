import { useState } from "react";
import { ContentPanel } from "./ContentPanel";
import { PageFlip } from "./PageFlip";
import conceptStampImage from "../../assets/creative-direction/concept.png";
import copyWritingStampImage from "../../assets/creative-direction/copy-writing.png";
import graphicDesignStampImage from "../../assets/creative-direction/graphic-design.png";
import nylonPhotoImage from "../../assets/creative-direction/nylon_photo.png";
import { folderSections } from "../../data/folderSections";
import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import styles from "./FolderInterior.module.css";

const FLIP_TABS: FolderSectionId[] = ["about", "archive", "experiments"];
const BRAND_IDENTITY_SECTION = folderSections.find(
  (section) => section.id === "archive",
);

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
  const [isFlipPageFront, setIsFlipPageFront] = useState(false);

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

    const renderBrandIdentityPage = (
      key: string,
      hideTopPhoto = false,
      backdropImageSrc?: string,
      omitPlanningStamp = false,
      levelBackdrop = false,
      stampImageSrcs?: string[],
    ) => BRAND_IDENTITY_SECTION ? (
      <ContentPanel
        activeSection={BRAND_IDENTITY_SECTION}
        brandIdentityBackdropImageSrc={backdropImageSrc}
        levelBrandIdentityBackdrop={levelBackdrop}
        hideBrandIdentityTopPhoto={hideTopPhoto}
        omitPlanningStamp={omitPlanningStamp}
        stampImageSrcs={stampImageSrcs}
        key={key}
      />
    ) : (
      <div className={styles.blankPage} key={key} />
    );

    // To add more pages: append elements to this array
    const pages = [
      <ContentPanel activeSection={activeSection} key="page-1" />,
      activeSectionId === "about" ? (
        renderBrandIdentityPage("page-2")
      ) : (
        <div className={styles.blankPage} key="page-2" />
      ),
      ...(activeSectionId === "about"
        ? [
            renderBrandIdentityPage("page-3", true, nylonPhotoImage, true, true, [
              conceptStampImage,
              graphicDesignStampImage,
              copyWritingStampImage,
            ]),
          ]
        : []),
    ];

    return (
      <PageFlip
        pages={pages}
        allowOverflow={allowsOverflow}
        pageIndex={currentPageIndex}
        onPageChange={handlePageChange}
        onClearingFolderChange={setIsFlipPageFront}
      />
    );
  };

  return (
    <div
      className={styles.interiorFrame}
      data-home={isHome}
      data-flip-page-front={isFlipPageFront}
    >
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
