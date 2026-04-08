import { useState, useTransition } from "react";
import { FolderScene } from "./components/folder/FolderScene";
import { folderSections } from "./data/folderSections";
import type { FolderSectionId } from "./data/folderSections";

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<FolderSectionId>(
    folderSections[0].id,
  );
  const [isPending, startTransition] = useTransition();

  const activeSection =
    folderSections.find((section) => section.id === activeSectionId) ??
    folderSections[0];

  const handleSectionChange = (sectionId: FolderSectionId) => {
    startTransition(() => {
      setActiveSectionId(sectionId);
    });
  };

  return (
    <FolderScene
      sections={folderSections}
      activeSection={activeSection}
      activeSectionId={activeSectionId}
      isPending={isPending}
      onSectionChange={handleSectionChange}
    />
  );
}
