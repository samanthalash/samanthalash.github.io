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
import contactThankYouImage from "../../../inspo/thankyou.png";
import contactEnvelopeImage from "../../../inspo/envelope.png";
import type {
  BrandIdentityStackImageControl,
  ContentPanelLayout,
} from "../../data/folderPages";
import type { FolderSection } from "../../data/folderSections";
import styles from "./ContentPanel.module.css";

interface ContentPanelProps {
  pageId?: string;
  activeSection: FolderSection;
  content?: FolderSection["placeholderContent"];
  layoutVariant?: ContentPanelLayout;
  copyBlockWidth?: string;
  copyBlockMaxWidth?: string;
  copyBlockJustifySelf?: CSSProperties["justifySelf"];
  copyBlockAlignSelf?: CSSProperties["alignSelf"];
  copyBlockShiftX?: string;
  copyBlockShiftY?: string;
  titleWidth?: string;
  titleWhiteSpace?: CSSProperties["whiteSpace"];
  titleFontSize?: string;
  titleLineHeight?: string;
  titleLetterSpacing?: string;
  titleTextAlign?: "left" | "center" | "right";
  titleMaxWidth?: string;
  titleMarginTop?: string;
  titleMarginBottom?: string;
  titleShiftX?: string;
  titleShiftY?: string;
  bodyWidth?: string;
  bodyMinWidth?: string;
  bodyMaxWidth?: string;
  bodyMarginTop?: string;
  bodyMarginBottom?: string;
  bodyFontSize?: string;
  bodyLineHeight?: string;
  bodyLetterSpacing?: string;
  bodyTextAlign?: "left" | "center" | "right";
  bodyShiftX?: string;
  bodyShiftY?: string;
  brandIdentityBackdropImageSrc?: string;
  brandIdentityStackImageSrcs?: string[];
  brandIdentityStackShiftX?: string;
  brandIdentityStackShiftY?: string;
  brandIdentityStackCardWidth?: string;
  brandIdentityStackCardAspect?: string;
  brandIdentityStackImageControls?: BrandIdentityStackImageControl[];
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
  copyBlockMaxWidth,
  copyBlockJustifySelf,
  copyBlockAlignSelf,
  copyBlockShiftX,
  copyBlockShiftY,
  titleWidth,
  titleWhiteSpace,
  titleFontSize,
  titleLineHeight,
  titleLetterSpacing,
  titleTextAlign,
  titleMaxWidth,
  titleMarginTop,
  titleMarginBottom,
  titleShiftX,
  titleShiftY,
  bodyWidth,
  bodyMinWidth,
  bodyMaxWidth,
  bodyMarginTop,
  bodyMarginBottom,
  bodyFontSize,
  bodyLineHeight,
  bodyLetterSpacing,
  bodyTextAlign,
  bodyShiftX,
  bodyShiftY,
  brandIdentityBackdropImageSrc,
  brandIdentityStackImageSrcs,
  brandIdentityStackShiftX,
  brandIdentityStackShiftY,
  brandIdentityStackCardWidth,
  brandIdentityStackCardAspect,
  brandIdentityStackImageControls,
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

  const getStackCardStyle = (
    imageControl?: BrandIdentityStackImageControl,
  ): CSSProperties | undefined => {
    if (!imageControl) {
      return undefined;
    }

    return {
      "--photo-top": imageControl.top,
      "--photo-left": imageControl.left,
      "--photo-width": imageControl.width,
      "--photo-aspect": imageControl.aspect,
      "--photo-rotate": imageControl.rotate,
      "--photo-layer": imageControl.layer,
      "--photo-scale": imageControl.scale,
      "--photo-shift-x": imageControl.shiftX,
      "--photo-shift-y": imageControl.shiftY,
    } as CSSProperties;
  };

  const getStackImageStyle = (
    imageControl?: BrandIdentityStackImageControl,
  ): CSSProperties | undefined => {
    if (!imageControl?.imageObjectFit && !imageControl?.imageObjectPosition) {
      return undefined;
    }

    return {
      objectFit: imageControl.imageObjectFit,
      objectPosition: imageControl.imageObjectPosition,
    };
  };

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

  if (activeSection.id === "contact") {
    return (
      <div className={`${styles.content} ${styles.contactContent}`}>
        <img
          src={contactThankYouImage}
          alt=""
          className={`${styles.contactImage} ${styles.contactThankYouImage}`}
          aria-hidden="true"
        />

        <img
          src={contactEnvelopeImage}
          alt=""
          className={`${styles.contactImage} ${styles.contactEnvelopeImage}`}
          aria-hidden="true"
        />

        <img
          src={paperclipImage}
          alt=""
          className={`${styles.contactPaperclip} ${styles.contactPaperclipPrimary}`}
          aria-hidden="true"
        />

        <img
          src={paperclipImage}
          alt=""
          className={`${styles.contactPaperclip} ${styles.contactPaperclipSecondary}`}
          aria-hidden="true"
        />
      </div>
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
    const copyBlockStyle: CSSProperties | undefined =
      copyBlockWidth ||
      copyBlockMaxWidth ||
      copyBlockJustifySelf ||
      copyBlockAlignSelf ||
      copyBlockShiftX ||
      copyBlockShiftY
        ? {
            width: copyBlockWidth,
            maxWidth: copyBlockMaxWidth,
            justifySelf: copyBlockJustifySelf,
            alignSelf: copyBlockAlignSelf,
            transform:
              copyBlockShiftX || copyBlockShiftY
                ? `translate(${copyBlockShiftX ?? "0px"}, calc(-4px + ${
                    copyBlockShiftY ?? "0px"
                  }))`
                : undefined,
          }
        : undefined;
    const titleStyle: CSSProperties | undefined =
      titleWidth ||
      titleWhiteSpace ||
      titleFontSize ||
      titleLineHeight ||
      titleLetterSpacing ||
      titleTextAlign ||
      titleMaxWidth ||
      titleMarginTop ||
      titleMarginBottom ||
      titleShiftX ||
      titleShiftY
        ? {
            width: titleWidth,
            whiteSpace: titleWhiteSpace,
            fontSize: titleFontSize,
            lineHeight: titleLineHeight,
            letterSpacing: titleLetterSpacing,
            textAlign: titleTextAlign,
            maxWidth: titleMaxWidth,
            marginTop: titleMarginTop,
            marginRight:
              (titleWidth || titleMaxWidth) && titleTextAlign === "left"
                ? "auto"
                : undefined,
            marginBottom: titleMarginBottom,
            marginLeft:
              (titleWidth || titleMaxWidth) && titleTextAlign !== "left"
                ? "auto"
                : undefined,
            transform:
              titleShiftX || titleShiftY
                ? `translate(${titleShiftX ?? "0px"}, ${titleShiftY ?? "0px"})`
                : undefined,
          }
        : undefined;
    const bodyStyle: CSSProperties | undefined =
      bodyWidth ||
      bodyMinWidth ||
      bodyMaxWidth ||
      bodyMarginTop ||
      bodyMarginBottom ||
      bodyFontSize ||
      bodyLineHeight ||
      bodyLetterSpacing ||
      bodyTextAlign ||
      bodyShiftX ||
      bodyShiftY
        ? {
            width: bodyWidth,
            minWidth: bodyMinWidth,
            maxWidth: bodyMaxWidth,
            marginTop: bodyMarginTop,
            marginBottom: bodyMarginBottom,
            fontSize: bodyFontSize,
            lineHeight: bodyLineHeight,
            letterSpacing: bodyLetterSpacing,
            textAlign: bodyTextAlign,
            transform:
              bodyShiftX || bodyShiftY
                ? `translate(${bodyShiftX ?? "0px"}, ${bodyShiftY ?? "0px"})`
                : undefined,
          }
        : undefined;
    const stackStyle: CSSProperties | undefined =
      brandIdentityStackShiftX ||
      brandIdentityStackShiftY ||
      brandIdentityStackCardWidth ||
      brandIdentityStackCardAspect
        ? ({
            "--brand-identity-stack-shift-x": brandIdentityStackShiftX,
            "--brand-identity-stack-shift-y": brandIdentityStackShiftY,
            "--brand-identity-stack-card-width": brandIdentityStackCardWidth,
            "--brand-identity-stack-card-aspect": brandIdentityStackCardAspect,
          } as CSSProperties)
        : undefined;

    return (
      <>
        <div className={contentClassName} data-page-id={pageId}>
          <div className={photoClusterClassName} aria-hidden="true">
            {isBrandIdentity ? (
              brandIdentityStackImageSrcs ? (
                <div
                  className={styles.brandIdentityImageStack}
                  style={stackStyle}
                >
                  {brandIdentityStackImageSrcs.map((imageSrc, index) => {
                    const stackCardClassName =
                      styles[`brandIdentityStackCard${index + 1}`];
                    const imageControl =
                      brandIdentityStackImageControls?.[index];

                    return (
                      <div
                        className={[
                          styles.creativePhotoCard,
                          styles.brandIdentityPhotoCard,
                          styles.brandIdentityStackCard,
                          stackCardClassName,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={getStackCardStyle(imageControl)}
                        key={imageSrc}
                      >
                        <img
                          src={imageSrc}
                          alt=""
                          style={getStackImageStyle(imageControl)}
                        />
                      </div>
                    );
                  })}
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
