import { useEffect, useState, useTransition } from "react";
import { VisualControls } from "./components/editor/VisualControls";
import { FolderScene } from "./components/folder/FolderScene";
import {
  defaultVisualSettings,
  folderSections,
} from "./data/folderSections";
import type { FolderSectionId, VisualSettings } from "./data/folderSections";

const visualSettingsStorageKey = "sam-portfolio-visual-settings";

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<FolderSectionId>(
    folderSections[0].id,
  );
  const [isPending, startTransition] = useTransition();
  const [visualSettings, setVisualSettings] =
    useState<VisualSettings>(defaultVisualSettings);

  useEffect(() => {
    const storedSettings = window.localStorage.getItem(visualSettingsStorageKey);

    if (!storedSettings) {
      return;
    }

    try {
      const parsedSettings = JSON.parse(storedSettings);

      setVisualSettings({
        folderScale:
          parsedSettings.folderScale ?? defaultVisualSettings.folderScale,
        folderTilt: parsedSettings.folderTilt ?? defaultVisualSettings.folderTilt,
        scenePadding:
          parsedSettings.scenePadding ?? defaultVisualSettings.scenePadding,
        paperInset: parsedSettings.paperInset ?? defaultVisualSettings.paperInset,
        contentScale:
          parsedSettings.contentScale ?? defaultVisualSettings.contentScale,
      });
    } catch {
      window.localStorage.removeItem(visualSettingsStorageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      visualSettingsStorageKey,
      JSON.stringify(visualSettings),
    );
  }, [visualSettings]);

  const activeSection =
    folderSections.find((section) => section.id === activeSectionId) ??
    folderSections[0];

  const handleSectionChange = (sectionId: FolderSectionId) => {
    startTransition(() => {
      setActiveSectionId(sectionId);
    });
  };

  const handleVisualSettingChange = (
    key: keyof VisualSettings,
    value: number,
  ) => {
    setVisualSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleResetVisualSettings = () => {
    setVisualSettings(defaultVisualSettings);
  };

  return (
    <FolderScene
      sections={folderSections}
      activeSection={activeSection}
      activeSectionId={activeSectionId}
      isPending={isPending}
      onSectionChange={handleSectionChange}
      visualControls={
        <VisualControls
          settings={visualSettings}
          onChange={handleVisualSettingChange}
          onReset={handleResetVisualSettings}
        />
      }
      visualSettings={visualSettings}
    />
  );
}
