import { useEffect, useState } from "react";
import {
  portfolioGalleryImages,
  type PortfolioGalleryImage,
} from "../../data/portfolioGallery";
import styles from "./PortfolioGalleryOverlay.module.css";

interface PortfolioGalleryOverlayProps {
  galleryId?: string;
  images?: PortfolioGalleryImage[];
  title?: string;
  onClose: () => void;
}

interface ActivePresentation {
  pdfSrc: string;
  title: string;
  slideCount?: number;
}

export function PortfolioGalleryOverlay({
  galleryId,
  images = portfolioGalleryImages,
  title,
  onClose,
}: PortfolioGalleryOverlayProps) {
  const ariaTitle = title ?? "Portfolio image gallery";
  const [activePresentation, setActivePresentation] =
    useState<ActivePresentation | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      // Escape closes the presentation viewer first, then the gallery.
      if (activePresentation) {
        setActivePresentation(null);
      } else {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, activePresentation]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={ariaTitle}
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close portfolio image gallery"
        onClick={onClose}
      />

      <div className={styles.galleryShell}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          Close
        </button>

        <div className={styles.galleryScroll}>
          {title && <h2 className={styles.galleryTitle}>{title}</h2>}
          <div className={styles.galleryGrid} data-gallery-id={galleryId}>
            {images.map((image) =>
              image.pdfSrc ? (
                <button
                  type="button"
                  className={`${styles.galleryItem} ${styles.presentationItem}`}
                  key={image.id}
                  onClick={() =>
                    setActivePresentation({
                      pdfSrc: image.pdfSrc!,
                      title: image.alt,
                      slideCount: image.slideCount,
                    })
                  }
                  aria-label={`Open ${image.alt}${
                    image.slideCount ? ` — ${image.slideCount} slides` : ""
                  }`}
                >
                  <span className={styles.presentationStack} aria-hidden="true" />
                  <span className={styles.presentationCover}>
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <span className={styles.presentationScrim} aria-hidden="true" />
                    <span className={styles.presentationBadge}>
                      <svg
                        className={styles.presentationBadgeIcon}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="13"
                          rx="1.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="M9 21h6M12 17v4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                      Presentation
                      {image.slideCount ? ` · ${image.slideCount} slides` : ""}
                    </span>
                    <span className={styles.presentationPlay} aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="11"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" />
                      </svg>
                    </span>
                    <span className={styles.presentationHint}>
                      Click to browse slides
                    </span>
                  </span>
                </button>
              ) : (
                <figure className={styles.galleryItem} key={image.id}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </figure>
              ),
            )}
          </div>
        </div>
      </div>

      {activePresentation && (
        <div
          className={styles.presentationViewer}
          role="dialog"
          aria-modal="true"
          aria-label={activePresentation.title}
        >
          <button
            type="button"
            className={styles.presentationBackdrop}
            aria-label="Close presentation"
            onClick={() => setActivePresentation(null)}
          />
          <div className={styles.presentationFrame}>
            <div className={styles.presentationBar}>
              <span className={styles.presentationBarTitle}>
                {activePresentation.title}
                {activePresentation.slideCount
                  ? ` · ${activePresentation.slideCount} slides`
                  : ""}
              </span>
              <div className={styles.presentationBarActions}>
                <a
                  className={styles.presentationOpenLink}
                  href={activePresentation.pdfSrc}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in new tab
                </a>
                <button
                  type="button"
                  className={styles.presentationBarButton}
                  onClick={() => setActivePresentation(null)}
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              className={styles.presentationDocument}
              src={`${activePresentation.pdfSrc}#view=FitH`}
              title={activePresentation.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}
