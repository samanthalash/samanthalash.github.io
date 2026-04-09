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
          d="M6,20 L6,10 Q6,6 10,6 L36,6 Q41,6 43,9 L48,20 Z"
          fill="#f1aacd"
        />
        <path
          d="M8,12 Q24,10 44,14 L44,17 Q24,13 8,15 Z"
          fill="rgba(255,255,255,0.18)"
        />
      </g>
      {/* Folder body */}
      <rect x="6" y="18" width="84" height="62" rx="10" fill="#ffc0cf" />
      {/* Body inner highlight streak */}
      <path
        d="M16,20 Q48,25 80,20 L80,28 Q48,35 16,28 Z"
        fill="rgba(255,255,255,0.15)"
      />
      {/* Bottom shade for depth */}
      <rect
        x="6"
        y="62"
        width="84"
        height="18"
        fill="rgba(39,39,39,0.07)"
        style={{ borderRadius: "0 0 10px 10px" }}
      />
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
