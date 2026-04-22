import paperclipImage from "../../assets/paperclip.png";
import monogramImage from "../../assets/monogram.png";
import postcardImage from "../../assets/postcard.png";
import libraryCardImage from "../../assets/library-card.png";
import type { FolderSection } from "../../data/folderSections";
import styles from "./ContentPanel.module.css";

interface ContentPanelProps {
  activeSection: FolderSection;
}

export function ContentPanel({ activeSection }: ContentPanelProps) {
  const { placeholderContent } = activeSection;
  const isHome = activeSection.id === "work";

  if (isHome) {
    return (
      <>
        <div className={`${styles.content} ${styles.homeContent}`}>
          <img
            src={monogramImage}
            alt="Samantha Lash monogram"
            className={styles.homeMonogram}
          />

          <img
            src={libraryCardImage}
            alt=""
            className={styles.homeLibraryCard}
            aria-hidden="true"
          />

          <img
            src={postcardImage}
            alt="Samantha Lash — creative direction, content, branding"
            className={styles.homePostcard}
          />
        </div>

        <img
          src={paperclipImage}
          alt=""
          className={styles.homePaperclip}
          aria-hidden="true"
        />
      </>
    );
  }

  return (
    <div className={styles.content} />
  );
}
