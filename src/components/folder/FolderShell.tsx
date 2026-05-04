import { DecorativeElements } from "./DecorativeElements";
import { FolderInterior } from "./FolderInterior";
import { FolderTabs } from "./FolderTabs";
import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import styles from "./FolderShell.module.css";

interface FolderShellProps {
  sections: FolderSection[];
  activeSection: FolderSection;
  activeSectionId: FolderSectionId;
  isIntroVisible: boolean;
  isPending: boolean;
  onSectionChange: (sectionId: FolderSectionId) => void;
}

export function FolderShell({
  sections,
  activeSection,
  activeSectionId,
  isIntroVisible,
  isPending,
  onSectionChange,
}: FolderShellProps) {
  return (
    <section className={styles.folderWrap} aria-label="Portfolio folder">
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
        />
      </div>
    </section>
  );
}
