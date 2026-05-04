import { useEffect } from "react";
import styles from "./PortfolioHintOverlay.module.css";

interface PortfolioHintOverlayProps {
  onDismiss: () => void;
}

const AUTO_DISMISS_MS = 9100;

export function PortfolioHintOverlay({ onDismiss }: PortfolioHintOverlayProps) {
  useEffect(() => {
    const dismissTimer = window.setTimeout(onDismiss, AUTO_DISMISS_MS);

    return () => {
      window.clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  return (
    <div className={styles.overlay} aria-live="polite">
      <div className={styles.photoHint} aria-hidden="true">
        <span className={`${styles.demoPhoto} ${styles.demoPhotoBack}`} />
        <span className={`${styles.demoPhoto} ${styles.demoPhotoMiddle}`} />
        <span className={`${styles.demoPhoto} ${styles.demoPhotoFront}`} />
        <span className={styles.dragDot} />
      </div>

      <div className={styles.photoMessage}>
        Drag pictures to move them and bring them forward.
      </div>

      <div className={styles.cornerMessage}>
        <span className={styles.cornerText}>Click the corner to flip pages.</span>
        <span className={styles.cornerArrow} aria-hidden="true" />
      </div>

      <button
        type="button"
        className={styles.closeButton}
        onClick={onDismiss}
        aria-label="Close portfolio interaction hint"
      >
        Close
      </button>
    </div>
  );
}
