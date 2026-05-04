import { useEffect } from "react";
import { portfolioGalleryImages } from "../../data/portfolioGallery";
import styles from "./PortfolioGalleryOverlay.module.css";

interface PortfolioGalleryOverlayProps {
  onClose: () => void;
}

export function PortfolioGalleryOverlay({
  onClose,
}: PortfolioGalleryOverlayProps) {
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
      aria-label="Portfolio image gallery"
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
          <div className={styles.galleryGrid}>
            {portfolioGalleryImages.map((image) => (
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
