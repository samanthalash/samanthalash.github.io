import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { PortfolioGalleryImage } from "../../data/portfolioGallery";
import { layoutAssetOptions } from "../../data/layoutAssets";
import type {
  EditableElement,
  EditableImageElement,
  EditableShapeElement,
  EditableTabShape,
  EditableTabStyle,
  EditableTextElement,
} from "../../data/editableLayoutTypes";
import { useLayoutEditor } from "../../editor/LayoutEditorContext";
import styles from "./LayoutEditorOverlay.module.css";

const numberValue = (value: string) => Number.parseFloat(value) || 0;
const PANEL_POSITION_KEY = "layoutEditorPanelPosition";
const PANEL_MARGIN = 12;
const CANVAS_ASPECT_RATIO = 16 / 9;
const DEFAULT_IMAGE_WIDTH = 48;
const DEFAULT_IMAGE_HEIGHT = 54;
const MAX_IMAGE_WIDTH = 58;
const MAX_IMAGE_HEIGHT = 72;

interface PanelPosition {
  x: number;
  y: number;
}

interface ActiveGalleryEditor {
  id: string;
  title: string;
  images: PortfolioGalleryImage[];
}

interface ImageDimensions {
  width: number;
  height: number;
}

const roundValue = (value: number) => Math.round(value * 100) / 100;

const getImagePlacement = (dimensions?: ImageDimensions) => {
  if (
    !dimensions ||
    !Number.isFinite(dimensions.width) ||
    !Number.isFinite(dimensions.height) ||
    dimensions.width <= 0 ||
    dimensions.height <= 0
  ) {
    return {
      x: roundValue((100 - DEFAULT_IMAGE_WIDTH) / 2),
      y: roundValue((100 - DEFAULT_IMAGE_HEIGHT) / 2),
      width: DEFAULT_IMAGE_WIDTH,
      height: DEFAULT_IMAGE_HEIGHT,
    };
  }

  const imageAspectRatio = dimensions.width / dimensions.height;
  let width = imageAspectRatio >= 1 ? DEFAULT_IMAGE_WIDTH : 38;
  let height = (width * CANVAS_ASPECT_RATIO) / imageAspectRatio;

  if (height > MAX_IMAGE_HEIGHT) {
    height = MAX_IMAGE_HEIGHT;
    width = (height * imageAspectRatio) / CANVAS_ASPECT_RATIO;
  }

  if (width > MAX_IMAGE_WIDTH) {
    width = MAX_IMAGE_WIDTH;
    height = (width * CANVAS_ASPECT_RATIO) / imageAspectRatio;
  }

  return {
    x: roundValue((100 - width) / 2),
    y: roundValue((100 - height) / 2),
    width: roundValue(width),
    height: roundValue(height),
  };
};

const readImageDimensions = (src: string) =>
  new Promise<ImageDimensions>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    });
    image.addEventListener("error", () => {
      reject(new Error("Unable to read image dimensions."));
    });
    image.src = src;
  });

const readFileImageDimensions = (file: File) => {
  const objectUrl = URL.createObjectURL(file);
  return readImageDimensions(objectUrl).finally(() => {
    URL.revokeObjectURL(objectUrl);
  });
};

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

interface LayoutEditorOverlayProps {
  activeGallery?: ActiveGalleryEditor;
  onUploadGalleryImage?: (galleryId: string, file: File) => Promise<void>;
  onRemoveGalleryImage?: (galleryId: string, imageId: string) => Promise<void>;
}

export function LayoutEditorOverlay({
  activeGallery,
  onUploadGalleryImage,
  onRemoveGalleryImage,
}: LayoutEditorOverlayProps) {
  const {
    canEdit,
    isEditMode,
    isPreviewing,
    layout,
    activePageId,
    selectedElementId,
    isTabStyleSelected,
    saveStatus,
    saveError,
    setIsEditMode,
    setIsPreviewing,
    setIsTabStyleSelected,
    setSelectedElementId,
    updateElement,
    updateTabStyle,
    addElement,
    deleteElement,
    duplicateElement,
    saveLayout,
    uploadAsset,
  } = useLayoutEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const dragStartRef = useRef({ pointerX: 0, pointerY: 0, x: 0, y: 0 });
  const [panelPosition, setPanelPosition] = useState(getInitialPanelPosition);
  const [isDraggingPanel, setIsDraggingPanel] = useState(false);
  const [isUploadingAsset, setIsUploadingAsset] = useState(false);
  const [isUploadingGalleryImage, setIsUploadingGalleryImage] = useState(false);
  const [isInspoAssetsOpen, setIsInspoAssetsOpen] = useState(false);
  const [removingGalleryImageId, setRemovingGalleryImageId] = useState<string>();
  const [uploadMessage, setUploadMessage] = useState<string>();
  const [galleryMessage, setGalleryMessage] = useState<string>();

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

  useEffect(() => {
    setUploadMessage(undefined);
  }, [activePageId]);

  useEffect(() => {
    setGalleryMessage(undefined);
    setRemovingGalleryImageId(undefined);
  }, [activeGallery?.id]);

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
    if (!file) {
      return;
    }

    if (!pageId) {
      setUploadMessage("No editable page is active.");
      return;
    }

    setIsUploadingAsset(true);
    setUploadMessage("Uploading image...");

    try {
      const dimensions = await readFileImageDimensions(file).catch(() => undefined);
      const src = await uploadAsset(file);
      const placement = getImagePlacement(dimensions);
      addElement(pageId, {
        type: "image",
        src,
        alt: file.name.replace(/\.[^.]+$/, ""),
        ...placement,
        rotation: 0,
        objectFit: "contain",
        objectPosition: "center",
      });
      setUploadMessage(`Added image to ${activePage?.name ?? "this page"}.`);
    } catch (error) {
      setUploadMessage(
        error instanceof Error ? error.message : "Image upload failed.",
      );
    } finally {
      setIsUploadingAsset(false);
    }
  };

  const addLayoutAsset = async (asset: (typeof layoutAssetOptions)[number]) => {
    if (!pageId) {
      setUploadMessage("No editable page is active.");
      return;
    }

    setUploadMessage(`Adding ${asset.label}...`);

    const dimensions = await readImageDimensions(asset.src).catch(() => undefined);
    addElement(pageId, {
      type: "image",
      assetId: asset.id,
      alt: asset.label,
      ...getImagePlacement(dimensions),
      rotation: 0,
      objectFit: "contain",
      objectPosition: "center",
    });
    setUploadMessage(`Added ${asset.label} to ${activePage?.name ?? "this page"}.`);
  };

  const handleGalleryUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !activeGallery || !onUploadGalleryImage) {
      return;
    }

    setIsUploadingGalleryImage(true);
    setGalleryMessage("Uploading image...");

    try {
      await onUploadGalleryImage(activeGallery.id, file);
      setGalleryMessage(`Added image to ${activeGallery.title}.`);
    } catch (error) {
      setGalleryMessage(
        error instanceof Error ? error.message : "Gallery image upload failed.",
      );
    } finally {
      setIsUploadingGalleryImage(false);
    }
  };

  const removeGalleryImage = async (imageId: string) => {
    if (!activeGallery || !onRemoveGalleryImage) {
      return;
    }

    setRemovingGalleryImageId(imageId);
    setGalleryMessage("Removing image...");

    try {
      await onRemoveGalleryImage(activeGallery.id, imageId);
      setGalleryMessage(`Removed image from ${activeGallery.title}.`);
    } catch (error) {
      setGalleryMessage(
        error instanceof Error ? error.message : "Gallery image removal failed.",
      );
    } finally {
      setRemovingGalleryImageId(undefined);
    }
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
          <p className={styles.pageName}>
            {isTabStyleSelected ? "Folder tabs" : activePage?.name ?? "No editable page"}
          </p>
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
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setSelectedElementId(undefined);
            setIsTabStyleSelected(true);
          }}
        >
          Tab style
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
                disabled={!pageId || isUploadingAsset}
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploadingAsset ? "Uploading..." : "Add image"}
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
            {uploadMessage && (
              <p className={styles.status}>{uploadMessage}</p>
            )}
          </section>

          <section className={styles.section}>
            <div className={styles.disclosureHeader}>
              <div>
                <h3 className={styles.sectionTitle}>Inspo images</h3>
                <p className={styles.status}>
                  Add committed images from the inspo folder.
                </p>
              </div>
              <button
                type="button"
                className={styles.button}
                aria-expanded={isInspoAssetsOpen}
                aria-controls="layout-editor-inspo-assets"
                onClick={() => setIsInspoAssetsOpen((isOpen) => !isOpen)}
              >
                {isInspoAssetsOpen ? "Hide" : "Show"}
              </button>
            </div>
            {isInspoAssetsOpen && (
              <div
                className={styles.assetGrid}
                id="layout-editor-inspo-assets"
              >
                {layoutAssetOptions.map((asset) => (
                  <button
                    type="button"
                    className={styles.assetButton}
                    disabled={!pageId}
                    title={asset.path}
                    key={asset.id}
                    onClick={() => {
                      void addLayoutAsset(asset);
                    }}
                  >
                    <img src={asset.src} alt="" />
                    <span>{asset.label}</span>
                  </button>
                ))}
              </div>
            )}
          </section>

          {activeGallery && (
            <section className={styles.section}>
              <div>
                <h3 className={styles.sectionTitle}>Image gallery</h3>
                <p className={styles.status}>{activeGallery.title}</p>
              </div>
              <div className={styles.row}>
                <button
                  type="button"
                  className={styles.button}
                  disabled={isUploadingGalleryImage}
                  onClick={() => galleryFileInputRef.current?.click()}
                >
                  {isUploadingGalleryImage ? "Uploading..." : "Add picture"}
                </button>
              </div>
              <input
                ref={galleryFileInputRef}
                type="file"
                accept="image/*"
                className={styles.hiddenFileInput}
                onChange={handleGalleryUpload}
              />
              {galleryMessage && (
                <p className={styles.status}>{galleryMessage}</p>
              )}
              <div className={styles.galleryImageList}>
                {activeGallery.images.map((image) => (
                  <div className={styles.galleryImageRow} key={image.id}>
                    <img src={image.src} alt={image.alt} />
                    <span>{image.alt || "Untitled image"}</span>
                    <button
                      type="button"
                      className={styles.dangerButton}
                      disabled={removingGalleryImageId === image.id}
                      onClick={() => removeGalleryImage(image.id)}
                    >
                      {removingGalleryImageId === image.id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {isTabStyleSelected ? (
            <TabStyleControls
              tabStyle={layout.tabStyle}
              onPatch={updateTabStyle}
            />
          ) : selectedElement ? (
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

const TAB_STYLE_FALLBACK: EditableTabStyle = {
  shape: "file",
  railInset: 38,
  gap: 8,
  height: 46,
  bodyInset: 10,
  cornerRadius: 24,
  shoulderSize: 20,
  slant: 8,
  activeOffset: 1,
  labelScale: 1,
};

function TabStyleControls({
  tabStyle,
  onPatch,
}: {
  tabStyle?: EditableTabStyle;
  onPatch: (patch: Partial<EditableTabStyle>) => void;
}) {
  const style = { ...TAB_STYLE_FALLBACK, ...tabStyle };
  const isFileShape = style.shape === "file";
  const usesCornerRadius = style.shape === "file" || style.shape === "pill";
  const usesSlant = style.shape === "angled" || style.shape === "ticket";
  const patchNumber =
    (key: keyof EditableTabStyle) => (event: ChangeEvent<HTMLInputElement>) => {
      onPatch({ [key]: numberValue(event.target.value) } as Partial<EditableTabStyle>);
    };

  return (
    <>
      <section className={styles.section}>
        <p className={styles.status}>
          These controls apply to every folder tab. Spacing uses equal grid
          columns and the tab shapes stay clipped inside the folder boundary.
        </p>
        <label className={styles.field}>
          Shape
          <select
            className={styles.select}
            value={style.shape}
            onChange={(event) =>
              onPatch({ shape: event.target.value as EditableTabShape })
            }
          >
            <option value="file">File</option>
            <option value="pill">Rounded</option>
            <option value="angled">Angled</option>
            <option value="ticket">Ticket</option>
          </select>
        </label>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          <RangeField
            label="Tab height"
            min={28}
            max={88}
            step={1}
            value={style.height}
            onChange={patchNumber("height")}
          />
          <RangeField
            label="Tab spacing"
            min={0}
            max={28}
            step={1}
            value={style.gap}
            onChange={patchNumber("gap")}
          />
          <RangeField
            label="Side inset"
            min={0}
            max={120}
            step={1}
            value={style.railInset}
            onChange={patchNumber("railInset")}
          />
          <RangeField
            label="Tab width inset"
            min={0}
            max={40}
            step={1}
            value={style.bodyInset}
            onChange={patchNumber("bodyInset")}
          />
          {usesCornerRadius && (
            <RangeField
              label="Corner radius"
              min={0}
              max={44}
              step={1}
              value={style.cornerRadius}
              onChange={patchNumber("cornerRadius")}
            />
          )}
          {isFileShape && (
            <RangeField
              label="Shoulder"
              min={0}
              max={36}
              step={1}
              value={style.shoulderSize}
              onChange={patchNumber("shoulderSize")}
            />
          )}
          {usesSlant && (
            <RangeField
              label="Slant"
              min={0}
              max={36}
              step={1}
              value={style.slant}
              onChange={patchNumber("slant")}
            />
          )}
          <RangeField
            label="Active offset"
            min={-10}
            max={10}
            step={1}
            value={style.activeOffset}
            onChange={patchNumber("activeOffset")}
          />
          <RangeField
            label="Label scale"
            min={0.75}
            max={1.35}
            step={0.05}
            value={style.labelScale}
            onChange={patchNumber("labelScale")}
          />
        </div>
      </section>
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

function RangeField({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className={styles.field}>
      {label}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        className={styles.input}
        value={Number.isFinite(value) ? value : min}
        onChange={onChange}
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        className={styles.input}
        value={Number.isFinite(value) ? value : min}
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
      <label className={styles.field}>
        Fit
        <select
          className={styles.select}
          value={element.objectFit}
          onChange={(event) =>
            onPatch({
              objectFit: event.target.value as EditableImageElement["objectFit"],
            } as Partial<EditableElement>)
          }
        >
          <option value="contain">Contain</option>
          <option value="cover">Cover</option>
        </select>
      </label>
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
