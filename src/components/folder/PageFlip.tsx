import { useState, useRef, useCallback } from "react";
import type {
  ReactNode,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
  TransitionEvent as ReactTransitionEvent,
} from "react";
import styles from "./PageFlip.module.css";

type FlipPhase =
  | "idle"
  | "flip-forward"
  | "flip-backward"
  | "dragging"
  | "settling";

interface PageFlipProps {
  pages: ReactNode[];
  allowOverflow?: boolean;
  pageIndex: number;
  onPageChange: (index: number) => void;
}

/**
 * Map drag progress (0→1) to the same out-and-under path as the click turn.
 * The sheet clears the visible page before it drops behind the stack.
 */
function computeDragStyle(progress: number): CSSProperties {
  const p = progress;
  const clamp = (value: number) => Math.max(0, Math.min(1, value));

  const outbound = clamp(p / 0.46);
  const tuck = clamp((p - 0.38) / 0.14);
  const inbound = clamp((p - 0.46) / 0.54);

  const translateX = p < 0.46 ? -136 * outbound : -136 + 136 * inbound;
  const translateY = p < 0.46 ? -7 * outbound : -7 + 7 * inbound;
  const translateZ =
    p < 0.38
      ? 4 + 88 * clamp(p / 0.38)
      : p < 0.52
        ? 92 - 126 * tuck
        : -34;
  const rotateX =
    p < 0.46 ? -7 * outbound : -7 + 7 * inbound;
  const rotateZ =
    p < 0.46 ? -4.8 * outbound : -4.8 + 4.8 * inbound;
  const scale = p < 0.52 ? 1 - 0.025 * clamp(p / 0.52) : 0.975 + 0.01 * inbound;

  return {
    zIndex: p >= 0.5 ? 0 : 4,
    transform: [
      `translate3d(${translateX}%, ${translateY}%, ${translateZ}px)`,
      `rotateX(${rotateX}deg)`,
      `rotateZ(${rotateZ}deg)`,
      `scale(${scale})`,
    ].join(" "),
  };
}

export function PageFlip({
  pages,
  allowOverflow = false,
  pageIndex,
  onPageChange,
}: PageFlipProps) {
  const count = pages.length;
  const [phase, setPhase] = useState<FlipPhase>("idle");
  const [dragProgress, setDragProgress] = useState(0);

  const settleTargetRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const containerWidthRef = useRef(0);
  const progressRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const nextIdx = (pageIndex + 1) % count;
  const prevIdx = (pageIndex - 1 + count) % count;
  const isActive = phase !== "idle";

  const isForward = phase !== "flip-backward";
  const baseIdx = isActive ? (isForward ? nextIdx : pageIndex) : pageIndex;
  const flipIdx = isForward ? pageIndex : prevIdx;

  // --- Forward corner: pointer interactions ---

  const handlePointerDown = useCallback(
    (e: ReactPointerEvent) => {
      if (isActive || count < 2) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      dragStartXRef.current = e.clientX;
      containerWidthRef.current = rect.width;
      progressRef.current = 0;
      hasDraggedRef.current = false;
      setDragProgress(0);
      setPhase("dragging");
    },
    [isActive, count],
  );

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (phase !== "dragging") return;
      const dx = dragStartXRef.current - e.clientX;
      if (Math.abs(dx) > 4) hasDraggedRef.current = true;
      const p = Math.max(
        0,
        Math.min(1, dx / (containerWidthRef.current * 0.55)),
      );
      progressRef.current = p;
      setDragProgress(p);
    },
    [phase],
  );

  const handlePointerUp = useCallback(() => {
    if (phase !== "dragging") return;
    if (!hasDraggedRef.current) {
      // Short click — use CSS keyframe animation
      setPhase("flip-forward");
      return;
    }
    const target = progressRef.current >= 0.38 ? 1 : 0;
    settleTargetRef.current = target;
    setDragProgress(target);
    setPhase("settling");
  }, [phase]);

  // --- Backward corner: click ---

  const handleBackwardClick = useCallback(() => {
    if (isActive || count < 2) return;
    setPhase("flip-backward");
  }, [isActive, count]);

  // --- Keyboard support ---

  const handleForwardKey = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isActive || count < 2) return;
        setPhase("flip-forward");
      }
    },
    [isActive, count],
  );

  const handleBackwardKey = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleBackwardClick();
      }
    },
    [handleBackwardClick],
  );

  // --- Animation end (CSS keyframe flips) ---

  const handleAnimationEnd = useCallback(() => {
    if (phase === "flip-forward") {
      onPageChange(nextIdx);
    } else if (phase === "flip-backward") {
      onPageChange(prevIdx);
    }
    setPhase("idle");
    setDragProgress(0);
  }, [phase, nextIdx, prevIdx, onPageChange]);

  // --- Transition end (drag settle) ---

  const handleTransitionEnd = useCallback(
    (e: ReactTransitionEvent) => {
      if (phase !== "settling" || e.propertyName !== "transform") return;
      if (e.currentTarget !== e.target) return;
      if (settleTargetRef.current === 1) {
        onPageChange(nextIdx);
      }
      setPhase("idle");
      setDragProgress(0);
    },
    [phase, nextIdx, onPageChange],
  );

  if (count < 2) {
    return <>{pages[0]}</>;
  }

  // Inline style only used during drag / settle; CSS animation handles clicks
  const flippingStyle =
    phase === "dragging" || phase === "settling"
      ? computeDragStyle(dragProgress)
      : undefined;

  return (
    <div className={styles.flipContainer} ref={containerRef}>
      {/* Base page (revealed underneath the lifting page) */}
      <div
        className={styles.pageLayer}
        data-overflow={allowOverflow && !isActive}
      >
        {pages[baseIdx]}
      </div>

      {/* Lifting page clears the stack, then returns behind the revealed page */}
      {isActive && (
        <div
          className={styles.flippingLayer}
          data-phase={phase}
          style={flippingStyle}
          onAnimationEnd={handleAnimationEnd}
          onTransitionEnd={handleTransitionEnd}
        >
          {pages[flipIdx]}
        </div>
      )}

      {/* Forward hotspot — bottom-right corner */}
      <div
        className={`${styles.cornerHotspot} ${styles.cornerRight}`}
        data-hidden={isActive}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleForwardKey}
        role="button"
        tabIndex={0}
        aria-label="Flip to next page"
      />

      {/* Backward hotspot — bottom-left corner */}
      <div
        className={`${styles.cornerHotspot} ${styles.cornerLeft}`}
        data-hidden={isActive}
        onClick={handleBackwardClick}
        onKeyDown={handleBackwardKey}
        role="button"
        tabIndex={0}
        aria-label="Flip to previous page"
      />
    </div>
  );
}
