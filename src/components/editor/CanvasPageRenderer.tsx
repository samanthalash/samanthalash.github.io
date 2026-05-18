import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { resolveLayoutAsset } from "../../data/layoutAssets";
import type {
  EditableElement,
  EditableImageElement,
  EditablePage,
  EditableShapeElement,
  EditableTextElement,
} from "../../data/editableLayoutTypes";
import { useLayoutEditor } from "../../editor/LayoutEditorContext";
import styles from "./CanvasPageRenderer.module.css";

interface CanvasPageRendererProps {
  page: EditablePage;
}

type InteractionKind = "move" | "resize" | "rotate";

interface InteractionState {
  kind: InteractionKind;
  pageId: string;
  element: EditableElement;
  pointerX: number;
  pointerY: number;
  rect: DOMRect;
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const round = (value: number) => Math.round(value * 100) / 100;
const PAPERCLIP_LAYER = 1000000;

const isPaperclipElement = (element: EditableElement) =>
  element.type === "image" &&
  ((element as EditableImageElement).assetId === "paperclip" ||
    element.id.toLowerCase().includes("paperclip"));

const getElementStyle = (element: EditableElement): CSSProperties => ({
  left: `${element.x}%`,
  top: `${element.y}%`,
  width: `${element.width}%`,
  height: `${element.height}%`,
  transform: `rotate(${element.rotation}deg)`,
  zIndex: isPaperclipElement(element) ? PAPERCLIP_LAYER : element.zIndex,
});

const getTextStyle = (element: EditableTextElement): CSSProperties =>
  ({
  "--editor-font-size": element.fontSize,
  color: element.color,
  fontFamily:
    element.fontFamily === "sans" ? "var(--font-sans)" : "var(--font-body)",
  fontSize: `${element.fontSize}px`,
  fontWeight: element.fontWeight,
  letterSpacing:
    element.letterSpacing === undefined ? undefined : `${element.letterSpacing}px`,
  lineHeight: element.lineHeight,
  textAlign: element.textAlign,
} as CSSProperties);

const renderElementContent = (element: EditableElement) => {
  if (element.type === "text") {
    return (
      <div className={styles.textElement} style={getTextStyle(element)}>
        {element.text}
      </div>
    );
  }

  if (element.type === "image") {
    const imageElement = element as EditableImageElement;
    const src = resolveLayoutAsset(imageElement.assetId, imageElement.src);
    if (!src) {
      return null;
    }

    return (
      <img
        src={src}
        alt={imageElement.alt ?? ""}
        className={styles.imageElement}
        style={{
          objectFit: imageElement.objectFit,
          objectPosition: imageElement.objectPosition,
          opacity: imageElement.opacity,
        }}
      />
    );
  }

  const shapeElement = element as EditableShapeElement;
  const shapeClassName =
    shapeElement.shape === "plus"
      ? `${styles.shapeElement} ${styles.plusShape}`
      : styles.shapeElement;

  return (
    <div
      className={shapeClassName}
      style={{
        background: shapeElement.fill,
        border:
          shapeElement.shape !== "plus" &&
          shapeElement.stroke &&
          shapeElement.strokeWidth
            ? `${shapeElement.strokeWidth}px solid ${shapeElement.stroke}`
            : undefined,
        borderRadius:
          shapeElement.shape === "ellipse" ? "50%" : `${shapeElement.radius ?? 0}px`,
        opacity: shapeElement.opacity,
      }}
    />
  );
};

export function CanvasPageRenderer({ page }: CanvasPageRendererProps) {
  const {
    isEditMode,
    isPreviewing,
    selectedElementId,
    setActivePageId,
    setSelectedElementId,
    updateElement,
  } = useLayoutEditor();
  const canvasRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<InteractionState | null>(null);
  const isEditing = isEditMode && !isPreviewing;

  useEffect(() => {
    setActivePageId(page.id);
  }, [page.id, setActivePageId]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const interaction = interactionRef.current;
      if (!interaction || !canvasRef.current) {
        return;
      }

      event.preventDefault();
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const dxPct =
        ((event.clientX - interaction.pointerX) / canvasRect.width) * 100;
      const dyPct =
        ((event.clientY - interaction.pointerY) / canvasRect.height) * 100;

      if (interaction.kind === "move") {
        updateElement(interaction.pageId, interaction.element.id, {
          x: round(clamp(interaction.element.x + dxPct, -30, 130)),
          y: round(clamp(interaction.element.y + dyPct, -30, 130)),
        });
        return;
      }

      if (interaction.kind === "resize") {
        updateElement(interaction.pageId, interaction.element.id, {
          width: round(clamp(interaction.element.width + dxPct, 2, 130)),
          height: round(clamp(interaction.element.height + dyPct, 2, 130)),
        });
        return;
      }

      const centerX = interaction.rect.left + interaction.rect.width / 2;
      const centerY = interaction.rect.top + interaction.rect.height / 2;
      const angle =
        (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) /
          Math.PI +
        90;
      updateElement(interaction.pageId, interaction.element.id, {
        rotation: round(angle),
      });
    };

    const handlePointerUp = () => {
      interactionRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [updateElement]);

  const visibleElements = useMemo(
    () =>
      page.elements
        .filter((element) => !element.hidden)
        .sort((a, b) => a.zIndex - b.zIndex),
    [page.elements],
  );

  const startInteraction = (
    event: ReactPointerEvent<HTMLElement>,
    element: EditableElement,
    kind: InteractionKind,
  ) => {
    if (!isEditing || element.locked) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const elementNode =
      target.closest<HTMLElement>("[data-editor-element='true']") ?? target;
    target.setPointerCapture(event.pointerId);
    setSelectedElementId(element.id);
    interactionRef.current = {
      kind,
      pageId: page.id,
      element,
      pointerX: event.clientX,
      pointerY: event.clientY,
      rect: elementNode.getBoundingClientRect(),
    };
  };

  return (
    <div
      className={styles.canvas}
      data-editing={isEditing}
      ref={canvasRef}
      onPointerDown={() => {
        if (isEditing) {
          setSelectedElementId(undefined);
        }
      }}
    >
      {visibleElements.map((element) => {
        const isSelected = isEditing && selectedElementId === element.id;
        return (
          <div
            className={styles.element}
            data-editing={isEditing}
            data-selected={isSelected}
            data-locked={element.locked}
            data-dragging={interactionRef.current?.element.id === element.id}
            data-editor-element="true"
            key={element.id}
            style={getElementStyle(element)}
            onPointerDown={(event) => startInteraction(event, element, "move")}
          >
            {renderElementContent(element)}
            {isEditing && !element.locked && (
              <>
                <span
                  className={styles.rotateHandle}
                  aria-hidden="true"
                  onPointerDown={(event) =>
                    startInteraction(event, element, "rotate")
                  }
                />
                <span
                  className={styles.resizeHandle}
                  aria-hidden="true"
                  onPointerDown={(event) =>
                    startInteraction(event, element, "resize")
                  }
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
