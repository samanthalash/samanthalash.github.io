import { useState, useCallback, useEffect, useRef } from "react";
import styles from "./DesktopScreen.module.css";

interface Props {
  onDismiss: () => void;
}

const ANIM_DURATION = 960;
const REDUCED_DURATION = 200;

function FolderIcon() {
  return (
    <svg
      className={styles.folderSvg}
      viewBox="0 0 96 86"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Tab / lid — rotates open on click */}
      <g className={styles.folderLid}>
        <path
          d="M11,20 L11,10 Q11,6 15,6 L41,6 Q46,6 48,9 L53,20 Z"
          fill="#ffc0cf"
        />
      </g>
      {/* Folder body */}
      <rect x="6" y="18" width="84" height="62" rx="10" fill="#ffc0cf" />
    </svg>
  );
}

export function DesktopScreen({ onDismiss }: Props) {
  const [phase, setPhase] = useState<"idle" | "animating">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleClick = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("animating");
    const duration = prefersReducedMotion() ? REDUCED_DURATION : ANIM_DURATION;
    timerRef.current = setTimeout(onDismiss, duration);
  }, [phase, onDismiss]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div className={styles.overlay} data-phase={phase}>
      <div className={styles.flashLayer} aria-hidden="true" />
      <button
        type="button"
        className={styles.iconWrap}
        onClick={handleClick}
        aria-label="Open Samantha's Portfolio"
        tabIndex={phase === "animating" ? -1 : 0}
      >
        <div className={styles.iconContainer}>
          <FolderIcon />
        </div>
        <span className={styles.label}>Samantha's Portfolio</span>
      </button>
    </div>
  );
}
