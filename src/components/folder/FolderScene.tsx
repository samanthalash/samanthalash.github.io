import { FolderShell } from "./FolderShell";
import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import styles from "./FolderScene.module.css";

interface FolderSceneProps {
  sections: FolderSection[];
  activeSection: FolderSection;
  activeSectionId: FolderSectionId;
  isIntroVisible: boolean;
  isPending: boolean;
  onSectionChange: (sectionId: FolderSectionId) => void;
  onOpenPortfolioGallery: () => void;
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
