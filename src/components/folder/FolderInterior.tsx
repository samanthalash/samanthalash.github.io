import { ContentPanel } from "./ContentPanel";
import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import styles from "./FolderInterior.module.css";

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
  return (
    <div className={styles.interiorFrame}>
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
        className={styles.paperSheet}
      >
        <ContentPanel activeSection={activeSection} />
      </section>
    </div>
  );
}
