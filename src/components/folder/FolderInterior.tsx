import { useCallback, useEffect, useState } from "react";
import { ContentPanel } from "./ContentPanel";
import { PageFlip } from "./PageFlip";
import { PortfolioHintOverlay } from "./PortfolioHintOverlay";
import { folderPagesBySectionId } from "../../data/folderPages";
import { folderSections } from "../../data/folderSections";
import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import styles from "./FolderInterior.module.css";

const FLIP_TABS: FolderSectionId[] = ["about", "archive", "experiments"];
const PORTFOLIO_HINT_STORAGE_KEY = "portfolioInteractionHintSeen";
const SECTION_BY_ID = new Map(
  folderSections.map((section) => [section.id, section]),
);

interface FolderInteriorProps {
  activeSection: FolderSection;
  activeSectionId: FolderSectionId;
  isIntroVisible: boolean;
  isPending: boolean;
  onOpenPortfolioGallery: () => void;
}

export function FolderInterior({
  activeSection,
  activeSectionId,
  isIntroVisible,
  isPending,
  onOpenPortfolioGallery,
}: FolderInteriorProps) {
  const isHome = activeSection.id === "work";
  const usesPhotoTemplate = activeSection.id !== "work";
  const allowsOverflow = isHome || usesPhotoTemplate;
  const isFlipEnabled = (FLIP_TABS as string[]).includes(activeSectionId);
  const [isFlipPageFront, setIsFlipPageFront] = useState(false);
  const [hasSeenPortfolioHint, setHasSeenPortfolioHint] = useState(() => {
    try {
      return localStorage.getItem(PORTFOLIO_HINT_STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [isPortfolioHintVisible, setIsPortfolioHintVisible] = useState(false);

  // Preserve per-tab page position across tab switches
  const [pageIndices, setPageIndices] = useState<Record<string, number>>({});
  const currentPageIndex = pageIndices[activeSectionId] ?? 0;
  const handlePageChange = (index: number) => {
    setPageIndices((prev) => ({ ...prev, [activeSectionId]: index }));
  };
  const dismissPortfolioHint = useCallback(() => {
    try {
      localStorage.setItem(PORTFOLIO_HINT_STORAGE_KEY, "1");
    } catch {
      // Storage can be unavailable in private or restricted browsing modes.
    }

    setHasSeenPortfolioHint(true);
    setIsPortfolioHintVisible(false);
  }, []);

  useEffect(() => {
    if (isIntroVisible || !isFlipEnabled) {
      setIsPortfolioHintVisible(false);
      return;
    }

    if (hasSeenPortfolioHint) {
      return;
    }

    setIsPortfolioHintVisible(true);
  }, [hasSeenPortfolioHint, isFlipEnabled, isIntroVisible]);

  const renderContent = () => {
    if (!isFlipEnabled) {
      return (
        <ContentPanel
          activeSection={activeSection}
          onOpenPortfolioGallery={onOpenPortfolioGallery}
        />
      );
    }

    const configuredPages = folderPagesBySectionId[activeSectionId] ?? [
      {
        id: `${activeSectionId}-page-1`,
        sectionId: activeSectionId,
        content: activeSection.placeholderContent,
      },
    ];

    const pages = configuredPages.map((page) => {
      const pageSection = SECTION_BY_ID.get(page.sectionId) ?? activeSection;

      return (
        <ContentPanel
          pageId={page.id}
          activeSection={pageSection}
          content={page.content}
          layoutVariant={page.layout}
          copyBlockWidth={page.copyBlockWidth}
          copyBlockMaxWidth={page.copyBlockMaxWidth}
          copyBlockJustifySelf={page.copyBlockJustifySelf}
          copyBlockAlignSelf={page.copyBlockAlignSelf}
          copyBlockShiftX={page.copyBlockShiftX}
          copyBlockShiftY={page.copyBlockShiftY}
          titleWidth={page.titleWidth}
          titleWhiteSpace={page.titleWhiteSpace}
          titleFontSize={page.titleFontSize}
          titleLineHeight={page.titleLineHeight}
          titleLetterSpacing={page.titleLetterSpacing}
          titleTextAlign={page.titleTextAlign}
          titleMaxWidth={page.titleMaxWidth}
          titleMarginTop={page.titleMarginTop}
          titleMarginBottom={page.titleMarginBottom}
          titleShiftX={page.titleShiftX}
          titleShiftY={page.titleShiftY}
          bodyWidth={page.bodyWidth}
          bodyMinWidth={page.bodyMinWidth}
          bodyMaxWidth={page.bodyMaxWidth}
          bodyMarginTop={page.bodyMarginTop}
          bodyMarginBottom={page.bodyMarginBottom}
          bodyFontSize={page.bodyFontSize}
          bodyLineHeight={page.bodyLineHeight}
          bodyLetterSpacing={page.bodyLetterSpacing}
          bodyTextAlign={page.bodyTextAlign}
          bodyShiftX={page.bodyShiftX}
          bodyShiftY={page.bodyShiftY}
          brandIdentityBackdropImageSrc={page.brandIdentityBackdropImageSrc}
          brandIdentityStackImageSrcs={page.brandIdentityStackImageSrcs}
          brandIdentityStackShiftX={page.brandIdentityStackShiftX}
          brandIdentityStackShiftY={page.brandIdentityStackShiftY}
          brandIdentityStackCardWidth={page.brandIdentityStackCardWidth}
          brandIdentityStackCardAspect={page.brandIdentityStackCardAspect}
          brandIdentityStackImageControls={page.brandIdentityStackImageControls}
          brandIdentityStampLabels={page.brandIdentityStampLabels}
          levelBrandIdentityBackdrop={page.levelBrandIdentityBackdrop}
          hideBrandIdentityTopPhoto={page.hideBrandIdentityTopPhoto}
          omitPlanningStamp={page.omitPlanningStamp}
          stampImageSrcs={page.stampImageSrcs}
          key={page.id}
        />
      );
    });

    if (pages.length < 2) {
      pages.push(<div className={styles.blankPage} key="blank-page-2" />);
    }

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

      {isPortfolioHintVisible && (
        <PortfolioHintOverlay onDismiss={dismissPortfolioHint} />
      )}
    </div>
  );
}
