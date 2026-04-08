import type { CSSProperties, ReactNode } from "react";
import { FolderShell } from "./FolderShell";
import type {
  FolderSection,
  FolderSectionId,
  VisualSettings,
} from "../../data/folderSections";
import styles from "./FolderScene.module.css";

interface FolderSceneProps {
  sections: FolderSection[];
  activeSection: FolderSection;
  activeSectionId: FolderSectionId;
  isPending: boolean;
  onSectionChange: (sectionId: FolderSectionId) => void;
  visualControls: ReactNode;
  visualSettings: VisualSettings;
}

export function FolderScene({
  visualControls,
  visualSettings,
  ...folderProps
}: FolderSceneProps) {
  const sceneStyle = {
    "--scene-padding": `${visualSettings.scenePadding}px`,
    "--folder-scale": `${visualSettings.folderScale}`,
    "--folder-tilt": `${visualSettings.folderTilt}deg`,
    "--paper-inset-side": `${visualSettings.paperInset}%`,
    "--paper-inset-top": `${Math.max(14, visualSettings.paperInset * 5.2)}%`,
    "--paper-inset-bottom": `${Math.max(3.2, visualSettings.paperInset + 1.1)}%`,
    "--content-scale": `${visualSettings.contentScale}`,
  } as CSSProperties;

  return (
    <main className={styles.scene} style={sceneStyle}>
      <div className={styles.surfaceGlow} aria-hidden="true" />
      <div className={styles.composition}>
        <FolderShell {...folderProps} />
        {visualControls}
      </div>
    </main>
  );
}
