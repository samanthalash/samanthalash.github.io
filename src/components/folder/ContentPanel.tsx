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
import hunterFlatlayImage from "../../assets/brand-identity/hunter-flatlay.png";
import hunterBillboardImage from "../../assets/brand-identity/hunter-billboard.png";
import type { FolderSection } from "../../data/folderSections";
import styles from "./ContentPanel.module.css";

interface ContentPanelProps {
  activeSection: FolderSection;
  hideBrandIdentityTopPhoto?: boolean;
}

export function ContentPanel({
  activeSection,
  hideBrandIdentityTopPhoto = false,
}: ContentPanelProps) {
  const { placeholderContent } = activeSection;
  const isHome = activeSection.id === "work";
  const isBrandIdentity = activeSection.id === "archive";
  const usesCreativeTemplate = activeSection.id !== "work";

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

  if (usesCreativeTemplate) {
    const contentClassName = `${styles.content} ${styles.creativeDirectionContent}${
      isBrandIdentity ? ` ${styles.brandIdentityContent}` : ""
    }`;
    const photoClusterClassName = `${styles.creativePhotoCluster}${
      isBrandIdentity ? ` ${styles.brandIdentityPhotoCluster}` : ""
    }`;
    const copyBlockClassName = `${styles.creativeCopyBlock}${
      isBrandIdentity ? ` ${styles.brandIdentityCopyBlock}` : ""
    }`;
    const bodyClassName = `${styles.creativeBody}${
      isBrandIdentity ? ` ${styles.brandIdentityBody}` : ""
    }`;
    const paperclipClassName = `${styles.creativePaperclip}${
      isBrandIdentity ? ` ${styles.brandIdentityPaperclip}` : ""
    }`;

    return (
      <>
        <div className={contentClassName}>
          <div className={photoClusterClassName} aria-hidden="true">
            {isBrandIdentity ? (
              <>
                <div
                  className={`${styles.creativePhotoCard} ${styles.brandIdentityPhotoCard} ${styles.brandIdentityPhotoBackdrop}`}
                >
                  <img src={hunterBillboardImage} alt="" />
                </div>

                {!hideBrandIdentityTopPhoto && (
                  <div
                    className={`${styles.creativePhotoCard} ${styles.brandIdentityPhotoCard} ${styles.brandIdentityPhotoTop}`}
                  >
                    <img src={hunterFlatlayImage} alt="" />
                  </div>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          <div className={copyBlockClassName}>
            <h2 className={styles.creativeTitle}>{placeholderContent.title}</h2>
            <p className={bodyClassName}>{placeholderContent.body}</p>
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
          className={paperclipClassName}
          aria-hidden="true"
        />
      </>
    );
  }

  return (
    <div className={styles.content} />
  );
}
