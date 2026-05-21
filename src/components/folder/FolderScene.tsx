import { useEffect, useState, type CSSProperties } from "react";
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
  onOpenProjectGallery: (galleryId: string) => void;
}

const FOLDER_DESIGN_WIDTH = 1394;
const FOLDER_DESIGN_HEIGHT = 784.125;
const SCENE_SAFE_GUTTER = 48;

const getFolderScale = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  const availableWidth = window.innerWidth - SCENE_SAFE_GUTTER;
  const availableHeight = window.innerHeight - SCENE_SAFE_GUTTER;

  return Math.min(
    1,
    availableWidth / FOLDER_DESIGN_WIDTH,
    availableHeight / FOLDER_DESIGN_HEIGHT,
  );
};

export function FolderScene(props: FolderSceneProps) {
  const [folderScale, setFolderScale] = useState(getFolderScale);

  useEffect(() => {
    const updateScale = () => {
      setFolderScale(getFolderScale());
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("orientationchange", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("orientationchange", updateScale);
    };
  }, []);

  const stageStyle = {
    "--folder-stage-scale": folderScale,
  } as CSSProperties;

  return (
    <main className={styles.scene}>
      <div className={styles.surfaceGlow} aria-hidden="true" />
      <div className={styles.composition}>
        <div className={styles.folderStage} style={stageStyle}>
          <FolderShell {...props} />
        </div>
      </div>
    </main>
  );
}
