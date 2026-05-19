import { DecorativeElements } from "./DecorativeElements";
import { FolderInterior } from "./FolderInterior";
import { FolderTabs } from "./FolderTabs";
import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import { useLayoutEditor } from "../../editor/LayoutEditorContext";
import type { CSSProperties } from "react";
import styles from "./FolderShell.module.css";

interface FolderShellProps {
  sections: FolderSection[];
  activeSection: FolderSection;
  activeSectionId: FolderSectionId;
  isIntroVisible: boolean;
  isPending: boolean;
  onSectionChange: (sectionId: FolderSectionId) => void;
  onOpenPortfolioGallery: () => void;
  onOpenProjectGallery: (galleryId: string) => void;
}

export function FolderShell({
  sections,
  activeSection,
  activeSectionId,
  isIntroVisible,
  isPending,
  onSectionChange,
  onOpenPortfolioGallery,
  onOpenProjectGallery,
}: FolderShellProps) {
  const { layout } = useLayoutEditor();
  const tabStyle = layout.tabStyle;
  const tabCssVars = tabStyle
    ? ({
        "--tab-height": `${tabStyle.height}px`,
        "--tab-rail-inset": `${tabStyle.railInset}px`,
        "--tab-gap": `${tabStyle.gap}px`,
        "--tab-body-inset": `${tabStyle.bodyInset}px`,
        "--tab-corner-radius": `${tabStyle.cornerRadius}px`,
        "--tab-shoulder-size": `${tabStyle.shoulderSize}%`,
        "--tab-slant": `${tabStyle.slant}px`,
        "--tab-active-offset": `${tabStyle.activeOffset}px`,
        "--tab-label-scale": tabStyle.labelScale,
      } as CSSProperties)
    : undefined;

  return (
    <section
      className={styles.folderWrap}
      aria-label="Portfolio folder"
      style={tabCssVars}
    >
      <div className={styles.shadowBase} aria-hidden="true" />
      <div className={styles.shadowContact} aria-hidden="true" />

      <div className={styles.folderBody}>
        <div className={styles.folderCover} aria-hidden="true" />
        <div className={styles.folderGrain} aria-hidden="true" />
        <div className={styles.folderWear} aria-hidden="true" />

        <FolderTabs
          sections={sections}
          activeSectionId={activeSectionId}
          onSectionChange={onSectionChange}
        />

        <DecorativeElements activeSection={activeSection} />

        <FolderInterior
          activeSection={activeSection}
          activeSectionId={activeSectionId}
          isIntroVisible={isIntroVisible}
          isPending={isPending}
          onOpenPortfolioGallery={onOpenPortfolioGallery}
          onOpenProjectGallery={onOpenProjectGallery}
        />
      </div>
    </section>
  );
}
