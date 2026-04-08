import type { ChangeEvent } from "react";
import type { VisualSettings } from "../../data/folderSections";
import styles from "./VisualControls.module.css";

interface VisualControlsProps {
  settings: VisualSettings;
  onChange: (key: keyof VisualSettings, value: number) => void;
  onReset: () => void;
}

const controlConfig: Array<{
  key: keyof VisualSettings;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix: string;
}> = [
  {
    key: "folderScale",
    label: "Folder size",
    min: 0.82,
    max: 1.08,
    step: 0.01,
    suffix: "x",
  },
  {
    key: "folderTilt",
    label: "Folder tilt",
    min: -2.5,
    max: 2.5,
    step: 0.05,
    suffix: "deg",
  },
  {
    key: "scenePadding",
    label: "Outer padding",
    min: 8,
    max: 48,
    step: 1,
    suffix: "px",
  },
  {
    key: "paperInset",
    label: "Paper margin",
    min: 2.2,
    max: 6.5,
    step: 0.1,
    suffix: "%",
  },
  {
    key: "contentScale",
    label: "Text scale",
    min: 0.9,
    max: 1.18,
    step: 0.01,
    suffix: "x",
  },
];

function formatValue(value: number, suffix: string) {
  if (suffix === "px") {
    return `${Math.round(value)}${suffix}`;
  }

  return `${value.toFixed(2)}${suffix}`;
}

export function VisualControls({
  settings,
  onChange,
  onReset,
}: VisualControlsProps) {
  const handleChange =
    (key: keyof VisualSettings) => (event: ChangeEvent<HTMLInputElement>) => {
      onChange(key, Number(event.target.value));
    };

  return (
    <aside className={styles.panel} aria-label="Visual editing controls">
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.kicker}>Studio Controls</p>
          <h2 className={styles.title}>Adjust the layout with your mouse</h2>
        </div>

        <button type="button" className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      </div>

      <p className={styles.description}>
        These sliders update the page live in your browser and stay saved on
        this device until you reset them.
      </p>

      <div className={styles.controlList}>
        {controlConfig.map((control) => (
          <label key={control.key} className={styles.control}>
            <div className={styles.controlMeta}>
              <span>{control.label}</span>
              <span>{formatValue(settings[control.key], control.suffix)}</span>
            </div>

            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={settings[control.key]}
              onChange={handleChange(control.key)}
            />
          </label>
        ))}
      </div>

      <div className={styles.tipBlock}>
        <p className={styles.tipTitle}>Quick edit spots</p>
        <p>
          Text and section names live in <code>src/data/folderSections.ts</code>.
        </p>
        <p>
          Colors and fonts live in <code>src/styles/tokens.css</code>.
        </p>
      </div>
    </aside>
  );
}
