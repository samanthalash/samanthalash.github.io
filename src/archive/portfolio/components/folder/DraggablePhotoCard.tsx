import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

interface DraggablePhotoCardProps {
  id: string;
  className: string;
  style?: CSSProperties;
  raisedLayer?: number;
  onActivate: (id: string) => void;
  children: ReactNode;
}

interface MotionState {
  x: number;
  y: number;
  rotate: number;
  isDragging: boolean;
  isReturning: boolean;
}

const INITIAL_MOTION: MotionState = {
  x: 0,
  y: 0,
  rotate: 0,
  isDragging: false,
  isReturning: false,
};

const MAX_ROTATION = 5.5;
const SPRING_STIFFNESS = 0.12;
const SPRING_DAMPING = 0.78;
const REST_THRESHOLD = 0.08;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function DraggablePhotoCard({
  id,
  className,
  style,
  raisedLayer,
  onActivate,
  children,
}: DraggablePhotoCardProps) {
  const [motion, setMotion] = useState<MotionState>(INITIAL_MOTION);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dragStartRef = useRef({ pointerX: 0, pointerY: 0, x: 0, y: 0 });
  const latestMotionRef = useRef({ x: 0, y: 0, rotate: 0 });
  const velocityRef = useRef({ x: 0, y: 0, rotate: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });

  const cancelReturnAnimation = useCallback(() => {
    if (animationFrameRef.current === null) {
      return;
    }

    window.cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  }, []);

  const setLatestMotion = useCallback((x: number, y: number, rotate: number) => {
    latestMotionRef.current = { x, y, rotate };
    setMotion({ x, y, rotate, isDragging: true, isReturning: false });
  }, []);

  const settleBackToOrigin = useCallback(() => {
    cancelReturnAnimation();

    if (prefersReducedMotion()) {
      latestMotionRef.current = { x: 0, y: 0, rotate: 0 };
      velocityRef.current = { x: 0, y: 0, rotate: 0 };
      setMotion(INITIAL_MOTION);
      return;
    }

    const tick = () => {
      const current = latestMotionRef.current;
      const velocity = velocityRef.current;

      velocity.x = (velocity.x - current.x * SPRING_STIFFNESS) * SPRING_DAMPING;
      velocity.y = (velocity.y - current.y * SPRING_STIFFNESS) * SPRING_DAMPING;
      velocity.rotate =
        (velocity.rotate - current.rotate * SPRING_STIFFNESS) * SPRING_DAMPING;

      const next = {
        x: current.x + velocity.x,
        y: current.y + velocity.y,
        rotate: current.rotate + velocity.rotate,
      };

      const isAtRest =
        Math.abs(next.x) < REST_THRESHOLD &&
        Math.abs(next.y) < REST_THRESHOLD &&
        Math.abs(next.rotate) < REST_THRESHOLD &&
        Math.abs(velocity.x) < REST_THRESHOLD &&
        Math.abs(velocity.y) < REST_THRESHOLD &&
        Math.abs(velocity.rotate) < REST_THRESHOLD;

      if (isAtRest) {
        latestMotionRef.current = { x: 0, y: 0, rotate: 0 };
        velocityRef.current = { x: 0, y: 0, rotate: 0 };
        animationFrameRef.current = null;
        setMotion(INITIAL_MOTION);
        return;
      }

      latestMotionRef.current = next;
      setMotion({
        ...next,
        isDragging: false,
        isReturning: true,
      });
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    setMotion((current) => ({
      ...current,
      isDragging: false,
      isReturning: true,
    }));
    animationFrameRef.current = window.requestAnimationFrame(tick);
  }, [cancelReturnAnimation]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      cancelReturnAnimation();
      onActivate(id);

      const latest = latestMotionRef.current;
      dragStartRef.current = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        x: latest.x,
        y: latest.y,
      };
      lastPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
      };
      velocityRef.current = { x: 0, y: 0, rotate: 0 };
      cardRef.current?.setPointerCapture(event.pointerId);
      setMotion({
        ...latest,
        isDragging: true,
        isReturning: false,
      });
    },
    [cancelReturnAnimation, id, onActivate],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!motion.isDragging) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const now = performance.now();
      const elapsed = Math.max(now - lastPointerRef.current.time, 16);
      const rawX =
        dragStartRef.current.x + event.clientX - dragStartRef.current.pointerX;
      const rawY =
        dragStartRef.current.y + event.clientY - dragStartRef.current.pointerY;
      const smoothedX =
        latestMotionRef.current.x + (rawX - latestMotionRef.current.x) * 0.72;
      const smoothedY =
        latestMotionRef.current.y + (rawY - latestMotionRef.current.y) * 0.72;
      const deltaX = event.clientX - lastPointerRef.current.x;
      const deltaY = event.clientY - lastPointerRef.current.y;
      const velocityX = deltaX / elapsed;
      const velocityY = deltaY / elapsed;
      const distanceRotate = clamp(smoothedX / 42, -2.4, 2.4);
      const velocityRotate = prefersReducedMotion()
        ? 0
        : clamp(velocityX * 28 + velocityY * 8, -3.1, 3.1);
      const nextRotate = prefersReducedMotion()
        ? 0
        : clamp(
            distanceRotate + velocityRotate,
            -MAX_ROTATION,
            MAX_ROTATION,
          );

      velocityRef.current = {
        x: deltaX * 0.34,
        y: deltaY * 0.34,
        rotate: (nextRotate - latestMotionRef.current.rotate) * 0.38,
      };
      lastPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        time: now,
      };
      setLatestMotion(smoothedX, smoothedY, nextRotate);
    },
    [motion.isDragging, setLatestMotion],
  );

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!motion.isDragging) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      if (cardRef.current?.hasPointerCapture(event.pointerId)) {
        cardRef.current.releasePointerCapture(event.pointerId);
      }
      settleBackToOrigin();
    },
    [motion.isDragging, settleBackToOrigin],
  );

  useEffect(
    () => () => {
      cancelReturnAnimation();
    },
    [cancelReturnAnimation],
  );

  useEffect(() => {
    cancelReturnAnimation();
    latestMotionRef.current = { x: 0, y: 0, rotate: 0 };
    velocityRef.current = { x: 0, y: 0, rotate: 0 };
    setMotion(INITIAL_MOTION);
  }, [cancelReturnAnimation, id]);

  const motionStyle = {
    ...style,
    "--photo-drag-x": `${motion.x}px`,
    "--photo-drag-y": `${motion.y}px`,
    "--photo-drag-rotate": `${motion.rotate}deg`,
    "--photo-active-layer": raisedLayer,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      className={className}
      style={motionStyle}
      data-dragging={motion.isDragging}
      data-returning={motion.isReturning}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </div>
  );
}
