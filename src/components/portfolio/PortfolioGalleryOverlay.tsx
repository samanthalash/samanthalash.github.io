import { useEffect } from "react";
import {
  portfolioGalleryImages,
  type PortfolioGalleryImage,
} from "../../data/portfolioGallery";
import styles from "./PortfolioGalleryOverlay.module.css";

interface PortfolioGalleryOverlayProps {
  images?: PortfolioGalleryImage[];
  title?: string;
  onClose: () => void;
}

export function PortfolioGalleryOverlay({
  images = portfolioGalleryImages,
  title,
  onClose,
}: PortfolioGalleryOverlayProps) {
  const ariaTitle = title ?? "Portfolio image gallery";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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
  }, [onClose]);

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
          <div className={styles.galleryGrid}>
            {images.map((image) => (
              <figure className={styles.galleryItem} key={image.id}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
