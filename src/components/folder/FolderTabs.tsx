import { FolderTab } from "./FolderTab";
import type { KeyboardEvent } from "react";
import type { FolderSection, FolderSectionId } from "../../data/folderSections";
import styles from "./FolderTabs.module.css";

interface FolderTabsProps {
  sections: FolderSection[];
  activeSectionId: FolderSectionId;
  onSectionChange: (sectionId: FolderSectionId) => void;
}

export function FolderTabs({
  sections,
  activeSectionId,
  onSectionChange,
}: FolderTabsProps) {
  const activeIndex = sections.findIndex(
    (section) => section.id === activeSectionId,
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    let nextIndex = activeIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (activeIndex + 1) % sections.length;
    }

    if (event.key === "ArrowLeft") {
      nextIndex = (activeIndex - 1 + sections.length) % sections.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = sections.length - 1;
    }

    const nextSection = sections[nextIndex];
    onSectionChange(nextSection.id);

    requestAnimationFrame(() => {
      document.getElementById(`tab-${nextSection.id}`)?.focus();
    });
  };

  return (
    <div
      className={styles.tabRail}
      role="tablist"
      aria-label="Portfolio sections"
      onKeyDown={handleKeyDown}
    >
      {sections.map((section, index) => (
        <FolderTab
          key={section.id}
          section={section}
          index={index}
          isActive={section.id === activeSectionId}
          onSelect={onSectionChange}
        />
      ))}
    </div>
  );
}
