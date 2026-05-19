import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type {
  EditableElement,
  EditableImageElement,
  EditableShapeElement,
  EditableTextElement,
} from "../../data/editableLayoutTypes";
import { useLayoutEditor } from "../../editor/LayoutEditorContext";
import styles from "./LayoutEditorOverlay.module.css";

const numberValue = (value: string) => Number.parseFloat(value) || 0;
const PANEL_POSITION_KEY = "layoutEditorPanelPosition";
const PANEL_MARGIN = 12;

interface PanelPosition {
  x: number;
  y: number;
}

const getInitialPanelPosition = (): PanelPosition => {
  if (typeof window === "undefined") {
    return { x: 16, y: 16 };
  }

  const savedPosition = window.localStorage.getItem(PANEL_POSITION_KEY);
  if (savedPosition) {
    try {
      const parsed = JSON.parse(savedPosition) as PanelPosition;
      if (Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
        return parsed;
      }
    } catch {
      // Ignore invalid saved panel state.
    }
  }

  return {
    x: Math.max(PANEL_MARGIN, window.innerWidth - 346),
    y: 16,
  };
};

export function LayoutEditorOverlay() {
  const {
    canEdit,
    isEditMode,
    isPreviewing,
    layout,
    activePageId,
    selectedElementId,
    saveStatus,
    saveError,
    setIsEditMode,
    setIsPreviewing,
    updateElement,
    addElement,
    deleteElement,
    duplicateElement,
    saveLayout,
    uploadAsset,
  } = useLayoutEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const dragStartRef = useRef({ pointerX: 0, pointerY: 0, x: 0, y: 0 });
  const [panelPosition, setPanelPosition] = useState(getInitialPanelPosition);
  const [isDraggingPanel, setIsDraggingPanel] = useState(false);

  const activePage = useMemo(
    () => layout.pages.find((page) => page.id === activePageId),
    [activePageId, layout.pages],
  );
  const selectedElement = useMemo(
    () =>
      activePage?.elements.find((element) => element.id === selectedElementId),
    [activePage?.elements, selectedElementId],
  );

  useEffect(() => {
    window.localStorage.setItem(
      PANEL_POSITION_KEY,
      JSON.stringify(panelPosition),
    );
  }, [panelPosition]);

  const clampPanelPosition = (position: PanelPosition) => {
    const rect = panelRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 330;
    const height = rect?.height ?? 400;

    return {
      x: Math.min(
        Math.max(PANEL_MARGIN, position.x),
        Math.max(PANEL_MARGIN, window.innerWidth - width - PANEL_MARGIN),
      ),
      y: Math.min(
        Math.max(PANEL_MARGIN, position.y),
        Math.max(PANEL_MARGIN, window.innerHeight - height - PANEL_MARGIN),
      ),
    };
  };

  const startPanelDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button, input, textarea, select")) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: panelPosition.x,
      y: panelPosition.y,
    };
    setIsDraggingPanel(true);
  };

  const movePanel = (event: ReactPointerEvent<HTMLElement>) => {
    if (!isDraggingPanel) {
      return;
    }

    event.preventDefault();
    const start = dragStartRef.current;
    setPanelPosition(
      clampPanelPosition({
        x: start.x + event.clientX - start.pointerX,
        y: start.y + event.clientY - start.pointerY,
      }),
    );
  };

  const stopPanelDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (!isDraggingPanel) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDraggingPanel(false);
  };

  if (!canEdit) {
    return null;
  }

  if (!isEditMode) {
    return (
      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setIsEditMode(true)}
      >
        Edit layout
      </button>
    );
  }

  const pageId = activePage?.id;
  const patchSelected = (patch: Partial<EditableElement>) => {
    if (!pageId || !selectedElement) {
      return;
    }

    updateElement(pageId, selectedElement.id, patch);
  };

  const addText = () => {
    if (!pageId) {
      return;
    }

    addElement(pageId, {
      type: "text",
      text: "New text",
      x: 58,
      y: 25,
      width: 28,
      height: 12,
      rotation: 0,
      fontSize: 28,
      lineHeight: 1,
      fontFamily: "sans",
      fontWeight: 400,
      letterSpacing: -1,
      color: "#272727",
      textAlign: "right",
    });
  };

  const addShape = (shape: EditableShapeElement["shape"]) => {
    if (!pageId) {
      return;
    }

    addElement(pageId, {
      type: "shape",
      shape,
      x: 40,
      y: 30,
      width: 18,
      height: 18,
      rotation: 0,
      fill: "rgba(255, 252, 247, 0.72)",
      stroke: "rgba(39, 39, 39, 0.55)",
      strokeWidth: 1,
      radius: shape === "rectangle" ? 8 : 0,
      opacity: 1,
    });
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !pageId) {
      return;
    }

    const src = await uploadAsset(file);
    addElement(pageId, {
      type: "image",
      src,
      alt: "",
      x: 12,
      y: 12,
      width: 34,
      height: 34,
      rotation: 0,
      objectFit: "contain",
      objectPosition: "center",
    });
  };

  return (
    <aside
      ref={panelRef}
      className={styles.panel}
      aria-label="Layout editor"
      data-dragging={isDraggingPanel}
      style={{ left: panelPosition.x, top: panelPosition.y }}
    >
      <div
        className={styles.header}
        onPointerDown={startPanelDrag}
        onPointerMove={movePanel}
        onPointerUp={stopPanelDrag}
        onPointerCancel={stopPanelDrag}
      >
        <div>
          <h2 className={styles.title}>Layout editor</h2>
          <p className={styles.pageName}>{activePage?.name ?? "No editable page"}</p>
          <p className={styles.status}>
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "saved" && "Saved to source JSON."}
            {saveStatus === "error" && (saveError ?? "Save failed.")}
            {saveStatus === "idle" && "Local dev only. Commit saved JSON."}
          </p>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsEditMode(false)}
        >
          Close
        </button>
      </div>

      <div className={styles.buttonRow}>
        <button type="button" className={styles.button} onClick={saveLayout}>
          Save
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsPreviewing(!isPreviewing)}
        >
          {isPreviewing ? "Edit" : "Preview"}
        </button>
      </div>

      {!isPreviewing && (
        <>
          <section className={styles.section}>
            <div className={styles.row}>
              <button type="button" className={styles.button} onClick={addText}>
                Add text
              </button>
              <button
                type="button"
                className={styles.button}
                onClick={() => fileInputRef.current?.click()}
              >
                Add image
              </button>
              <button
                type="button"
                className={styles.button}
                onClick={() => addShape("rectangle")}
              >
                Rectangle
              </button>
              <button
                type="button"
                className={styles.button}
                onClick={() => addShape("plus")}
              >
                Plus
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenFileInput}
              onChange={handleUpload}
            />
          </section>

          {selectedElement ? (
            <ElementControls
              element={selectedElement}
              onPatch={patchSelected}
              onDuplicate={() => {
                if (pageId) {
                  duplicateElement(pageId, selectedElement.id);
                }
              }}
              onDelete={() => {
                if (pageId) {
                  deleteElement(pageId, selectedElement.id);
                }
              }}
            />
          ) : (
            <section className={styles.section}>
              <p className={styles.status}>
                Select an element on the page to edit position, size, text, and
                style.
              </p>
            </section>
          )}
        </>
      )}
    </aside>
  );
}

function ElementControls({
  element,
  onPatch,
  onDuplicate,
  onDelete,
}: {
  element: EditableElement;
  onPatch: (patch: Partial<EditableElement>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const patchNumber =
    (key: keyof EditableElement) => (event: ChangeEvent<HTMLInputElement>) => {
      onPatch({ [key]: numberValue(event.target.value) } as Partial<EditableElement>);
    };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.row}>
          <button type="button" className={styles.button} onClick={onDuplicate}>
            Duplicate
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => onPatch({ locked: !element.locked })}
          >
            {element.locked ? "Unlock" : "Lock"}
          </button>
          <button type="button" className={styles.dangerButton} onClick={onDelete}>
            Delete
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          <NumberField label="X" value={element.x} onChange={patchNumber("x")} />
          <NumberField label="Y" value={element.y} onChange={patchNumber("y")} />
          <NumberField
            label="Width"
            value={element.width}
            onChange={patchNumber("width")}
          />
          <NumberField
            label="Height"
            value={element.height}
            onChange={patchNumber("height")}
          />
          <NumberField
            label="Rotate"
            value={element.rotation}
            onChange={patchNumber("rotation")}
          />
          <NumberField
            label="Layer"
            value={element.zIndex}
            onChange={patchNumber("zIndex")}
          />
        </div>
      </section>

      {element.type === "text" && (
        <TextControls element={element} onPatch={onPatch} />
      )}
      {element.type === "image" && (
        <ImageControls element={element} onPatch={onPatch} />
      )}
      {element.type === "shape" && (
        <ShapeControls element={element} onPatch={onPatch} />
      )}
    </>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className={styles.field}>
      {label}
      <input
        type="number"
        step="0.5"
        className={styles.input}
        value={Number.isFinite(value) ? value : 0}
        onChange={onChange}
      />
    </label>
  );
}

function TextControls({
  element,
  onPatch,
}: {
  element: EditableTextElement;
  onPatch: (patch: Partial<EditableElement>) => void;
}) {
  return (
    <section className={styles.section}>
      <label className={styles.field}>
        Text
        <textarea
          className={styles.textarea}
          value={element.text}
          onChange={(event) => onPatch({ text: event.target.value } as Partial<EditableElement>)}
        />
      </label>
      <div className={styles.grid}>
        <NumberField
          label="Font size"
          value={element.fontSize}
          onChange={(event) =>
            onPatch({ fontSize: numberValue(event.target.value) } as Partial<EditableElement>)
          }
        />
        <NumberField
          label="Line height"
          value={element.lineHeight}
          onChange={(event) =>
            onPatch({ lineHeight: numberValue(event.target.value) } as Partial<EditableElement>)
          }
        />
      </div>
      <label className={styles.field}>
        Align
        <select
          className={styles.select}
          value={element.textAlign}
          onChange={(event) =>
            onPatch({ textAlign: event.target.value } as Partial<EditableElement>)
          }
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </label>
      <label className={styles.field}>
        Color
        <input
          className={styles.input}
          value={element.color}
          onChange={(event) => onPatch({ color: event.target.value } as Partial<EditableElement>)}
        />
      </label>
    </section>
  );
}

function ImageControls({
  element,
  onPatch,
}: {
  element: EditableImageElement;
  onPatch: (patch: Partial<EditableElement>) => void;
}) {
  return (
    <section className={styles.section}>
      <p className={styles.status}>
        Image fit is locked to contain so resizing keeps proportions.
      </p>
      <label className={styles.field}>
        Object position
        <input
          className={styles.input}
          value={element.objectPosition}
          onChange={(event) =>
            onPatch({ objectPosition: event.target.value } as Partial<EditableElement>)
          }
        />
      </label>
    </section>
  );
}

function ShapeControls({
  element,
  onPatch,
}: {
  element: EditableShapeElement;
  onPatch: (patch: Partial<EditableElement>) => void;
}) {
  return (
    <section className={styles.section}>
      <label className={styles.field}>
        Fill
        <input
          className={styles.input}
          value={element.fill}
          onChange={(event) => onPatch({ fill: event.target.value } as Partial<EditableElement>)}
        />
      </label>
      <label className={styles.field}>
        Stroke
        <input
          className={styles.input}
          value={element.stroke ?? ""}
          onChange={(event) => onPatch({ stroke: event.target.value } as Partial<EditableElement>)}
        />
      </label>
    </section>
  );
}
