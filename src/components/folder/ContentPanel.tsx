import type { CSSProperties } from "react";
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
import type { ContentPanelLayout } from "../../data/folderPages";
import type { FolderSection } from "../../data/folderSections";
import styles from "./ContentPanel.module.css";

interface ContentPanelProps {
  pageId?: string;
  activeSection: FolderSection;
  content?: FolderSection["placeholderContent"];
  layoutVariant?: ContentPanelLayout;
  copyBlockWidth?: string;
  titleWhiteSpace?: CSSProperties["whiteSpace"];
  titleLineHeight?: string;
  titleTextAlign?: "left" | "center" | "right";
  titleMaxWidth?: string;
  titleShiftX?: string;
  titleShiftY?: string;
  bodyWidth?: string;
  bodyMaxWidth?: string;
  bodyMarginTop?: string;
  bodyFontSize?: string;
  bodyLineHeight?: string;
  bodyLetterSpacing?: string;
  bodyTextAlign?: "left" | "center" | "right";
  brandIdentityBackdropImageSrc?: string;
  brandIdentityStackImageSrcs?: string[];
  brandIdentityStampLabels?: string[];
  levelBrandIdentityBackdrop?: boolean;
  hideBrandIdentityTopPhoto?: boolean;
  omitPlanningStamp?: boolean;
  stampImageSrcs?: string[];
}

export function ContentPanel({
  pageId,
  activeSection,
  content,
  layoutVariant = "default",
  copyBlockWidth,
  titleWhiteSpace,
  titleLineHeight,
  titleTextAlign,
  titleMaxWidth,
  titleShiftX,
  titleShiftY,
  bodyWidth,
  bodyMaxWidth,
  bodyMarginTop,
  bodyFontSize,
  bodyLineHeight,
  bodyLetterSpacing,
  bodyTextAlign,
  brandIdentityBackdropImageSrc,
  brandIdentityStackImageSrcs,
  brandIdentityStampLabels,
  levelBrandIdentityBackdrop = false,
  hideBrandIdentityTopPhoto = false,
  omitPlanningStamp = false,
  stampImageSrcs,
}: ContentPanelProps) {
  const panelContent = content ?? activeSection.placeholderContent;
  const isHome = activeSection.id === "work";
  const isBrandIdentity =
    layoutVariant === "brandIdentity" || activeSection.id === "archive";
  const usesCreativeTemplate = activeSection.id !== "work";
  const brandIdentityBackdropImage =
    brandIdentityBackdropImageSrc ?? hunterBillboardImage;
  const stampImages =
    stampImageSrcs ??
    (omitPlanningStamp
      ? [conceptStampImage, stylingStampImage, photoStampImage]
      : [
          conceptStampImage,
          planningStampImage,
          stylingStampImage,
          photoStampImage,
        ]);

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
    const copyBlockStyle: CSSProperties | undefined = copyBlockWidth
      ? { width: copyBlockWidth }
      : undefined;
    const titleStyle: CSSProperties | undefined =
      titleWhiteSpace ||
      titleLineHeight ||
      titleTextAlign ||
      titleMaxWidth ||
      titleShiftX ||
      titleShiftY
        ? {
            whiteSpace: titleWhiteSpace,
            lineHeight: titleLineHeight,
            textAlign: titleTextAlign,
            maxWidth: titleMaxWidth,
            marginLeft: titleMaxWidth ? "auto" : undefined,
            transform:
              titleShiftX || titleShiftY
                ? `translate(${titleShiftX ?? "0px"}, ${titleShiftY ?? "0px"})`
                : undefined,
          }
        : undefined;
    const bodyStyle: CSSProperties | undefined =
      bodyWidth ||
      bodyMaxWidth ||
      bodyMarginTop ||
      bodyFontSize ||
      bodyLineHeight ||
      bodyLetterSpacing ||
      bodyTextAlign
        ? {
            width: bodyWidth,
            maxWidth: bodyMaxWidth,
            marginTop: bodyMarginTop,
            fontSize: bodyFontSize,
            lineHeight: bodyLineHeight,
            letterSpacing: bodyLetterSpacing,
            textAlign: bodyTextAlign,
          }
        : undefined;

    return (
      <>
        <div className={contentClassName} data-page-id={pageId}>
          <div className={photoClusterClassName} aria-hidden="true">
            {isBrandIdentity ? (
              brandIdentityStackImageSrcs ? (
                <div className={styles.brandIdentityImageStack}>
                  {brandIdentityStackImageSrcs.map((imageSrc, index) => (
                    <div
                      className={`${styles.creativePhotoCard} ${styles.brandIdentityPhotoCard} ${styles.brandIdentityStackCard} ${
                        styles[`brandIdentityStackCard${index + 1}`]
                      }`}
                      key={imageSrc}
                    >
                      <img src={imageSrc} alt="" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div
                    className={`${styles.creativePhotoCard} ${styles.brandIdentityPhotoCard} ${styles.brandIdentityPhotoBackdrop}${
                      levelBrandIdentityBackdrop
                        ? ` ${styles.levelBrandIdentityPhotoBackdrop}`
                        : ""
                    }`}
                  >
                    <img src={brandIdentityBackdropImage} alt="" />
                  </div>

                  {!hideBrandIdentityTopPhoto && (
                    <div
                      className={`${styles.creativePhotoCard} ${styles.brandIdentityPhotoCard} ${styles.brandIdentityPhotoTop}`}
                    >
                      <img src={hunterFlatlayImage} alt="" />
                    </div>
                  )}
                </>
              )
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

          <div className={copyBlockClassName} style={copyBlockStyle}>
            <h2 className={styles.creativeTitle} style={titleStyle}>
              {panelContent.title}
            </h2>
            <p className={bodyClassName} style={bodyStyle}>
              {panelContent.body}
            </p>
          </div>

          {brandIdentityStampLabels ? (
            <div
              className={styles.brandIdentityTextStampRow}
              aria-hidden="true"
            >
              {brandIdentityStampLabels.map((stampLabel) => (
                <span className={styles.brandIdentityTextStamp} key={stampLabel}>
                  {stampLabel}
                </span>
              ))}
            </div>
          ) : (
            <div className={styles.creativeStampRow} aria-hidden="true">
              {stampImages.map((stampImage) => (
                <img
                  src={stampImage}
                  alt=""
                  className={styles.creativeStamp}
                  key={stampImage}
                />
              ))}
            </div>
          )}
        </div>

        <img
          src={paperclipImage}
          alt=""
          className={paperclipClassName}
          data-page-id={pageId}
          aria-hidden="true"
        />
      </>
    );
  }

  return (
    <div className={styles.content} />
  );
}
