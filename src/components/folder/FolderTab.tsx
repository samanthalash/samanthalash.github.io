import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import styles from "./FolderTab.module.css";

interface FolderTabProps {
  section: FolderSection;
  index: number;
  isActive: boolean;
  onSelect: (sectionId: FolderSectionId) => void;
}

export function FolderTab({
  section,
  index,
  isActive,
  onSelect,
}: FolderTabProps) {
  return (
    <button
      id={`tab-${section.id}`}
      className={styles.tab}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${section.id}`}
      tabIndex={isActive ? 0 : -1}
      data-active={isActive}
      data-index={index}
      onClick={() => onSelect(section.id)}
    >
      <span className={styles.tabBody} aria-hidden="true" />
      <span className={styles.label}>{section.label}</span>
    </button>
  );
}
