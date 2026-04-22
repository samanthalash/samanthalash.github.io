import type { FolderSection } from "../../data/folderSections";
import styles from "./DecorativeElements.module.css";

interface DecorativeElementsProps {
  activeSection: FolderSection;
}

export function DecorativeElements({
  activeSection,
}: DecorativeElementsProps) {
  if (activeSection.id === "work") {
    return (
      <div className={styles.decorativeLayer} aria-hidden="true" />
    );
  }

  return (
    <div className={styles.decorativeLayer} aria-hidden="true" />
  );
}
