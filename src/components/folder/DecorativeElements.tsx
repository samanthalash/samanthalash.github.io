import type { FolderSection } from "../../data/folderSections";
import stampLogo from "../../assets/stamp-logo.png";
import styles from "./DecorativeElements.module.css";

interface DecorativeElementsProps {
  activeSection: FolderSection;
}

export function DecorativeElements({
  activeSection,
}: DecorativeElementsProps) {
  if (activeSection.id === "work") {
    return (
      <div className={styles.decorativeLayer} aria-hidden="true">
        <img src={stampLogo} alt="" className={styles.homeStampLogo} />
      </div>
    );
  }

  return (
    <div className={styles.decorativeLayer} aria-hidden="true">
      <div className={styles.clipLarge} />
      <div className={styles.clipSmall} />

      <div className={styles.titleBlock}>
        <p className={styles.kicker}>Samantha Lash</p>
        <p className={styles.scriptTitle}>Portfolio Archive</p>
      </div>

      <div className={styles.labelBlock}>
        <span className={styles.labelTitle}>Filed Under</span>
        <span className={styles.labelValue}>{activeSection.label}</span>
        <span className={styles.labelCode}>{activeSection.shortCode}</span>
      </div>

      <div className={styles.stamp}>{activeSection.stampText}</div>
      <p className={styles.typeLine}>{activeSection.annotation}</p>
      <p
        className={styles.handwritten}
        data-accent-style={activeSection.accentStyle}
      >
        reviewed softly under daylight
      </p>
      <p className={styles.microCode}>Ref. 04 / archival presentation draft</p>
    </div>
  );
}
