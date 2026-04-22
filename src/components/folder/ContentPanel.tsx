import paperclipImage from "../../assets/paperclip.png";
import monogramImage from "../../assets/monogram.png";
import postcardImage from "../../assets/postcard.png";
import libraryCardImage from "../../assets/library-card.png";
import conceptStampImage from "../../assets/creative-direction/concept.png";
import planningStampImage from "../../assets/creative-direction/planning.png";
import stylingStampImage from "../../assets/creative-direction/styling.png";
import photoStampImage from "../../assets/creative-direction/photo.png";
import leviCyclistImage from "../../assets/creative-direction/levi-cyclist.png";
import leviBillboardImage from "../../assets/creative-direction/levi-billboard.png";
import leviDesertImage from "../../assets/creative-direction/levi-desert.png";
import leviBeachImage from "../../assets/creative-direction/levi-beach.png";
import type { FolderSection } from "../../data/folderSections";
import styles from "./ContentPanel.module.css";

interface ContentPanelProps {
  activeSection: FolderSection;
}

export function ContentPanel({ activeSection }: ContentPanelProps) {
  const { placeholderContent } = activeSection;
  const isHome = activeSection.id === "work";
  const isCreativeDirection = activeSection.id === "about";

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

  if (isCreativeDirection) {
    return (
      <>
        <div className={`${styles.content} ${styles.creativeDirectionContent}`}>
          <div className={styles.creativePhotoCluster} aria-hidden="true">
            <div
              className={`${styles.creativePhotoCard} ${styles.creativePhotoBillboard}`}
            >
              <img src={leviBillboardImage} alt="" />
            </div>

            <div
              className={`${styles.creativePhotoCard} ${styles.creativePhotoCyclist}`}
            >
              <img src={leviCyclistImage} alt="" />
            </div>

            <div
              className={`${styles.creativePhotoCard} ${styles.creativePhotoBeach}`}
            >
              <img src={leviBeachImage} alt="" />
            </div>

            <div
              className={`${styles.creativePhotoCard} ${styles.creativePhotoHero}`}
            >
              <img src={leviDesertImage} alt="" />
            </div>
          </div>

          <div className={styles.creativeCopyBlock}>
            <h2 className={styles.creativeTitle}>{placeholderContent.title}</h2>
            <p className={styles.creativeBody}>{placeholderContent.body}</p>
          </div>

          <div className={styles.creativeStampRow} aria-hidden="true">
            <img
              src={conceptStampImage}
              alt=""
              className={styles.creativeStamp}
            />
            <img
              src={planningStampImage}
              alt=""
              className={styles.creativeStamp}
            />
            <img
              src={stylingStampImage}
              alt=""
              className={styles.creativeStamp}
            />
            <img
              src={photoStampImage}
              alt=""
              className={styles.creativeStamp}
            />
          </div>
        </div>

        <img
          src={paperclipImage}
          alt=""
          className={styles.creativePaperclip}
          aria-hidden="true"
        />
      </>
    );
  }

  return (
    <div className={styles.content} />
  );
}
