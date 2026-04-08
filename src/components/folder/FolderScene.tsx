import { FolderShell } from "./FolderShell";
import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import styles from "./FolderScene.module.css";

interface FolderSceneProps {
  sections: FolderSection[];
  activeSection: FolderSection;
  activeSectionId: FolderSectionId;
  isPending: boolean;
  onSectionChange: (sectionId: FolderSectionId) => void;
}

export function FolderScene(props: FolderSceneProps) {
  return (
    <main className={styles.scene}>
      <div className={styles.surfaceGlow} aria-hidden="true" />
      <div className={styles.composition}>
        <FolderShell {...props} />
      </div>
    </main>
  );
}
