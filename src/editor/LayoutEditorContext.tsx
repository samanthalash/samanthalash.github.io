import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import initialLayout from "../data/editableLayout.json";
import type {
  EditableElement,
  EditableImageElement,
  EditableLayoutDocument,
  EditablePage,
  NewEditableElement,
} from "../data/editableLayoutTypes";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface LayoutEditorContextValue {
  canEdit: boolean;
  isEditMode: boolean;
  isPreviewing: boolean;
  layout: EditableLayoutDocument;
  activePageId?: string;
  selectedElementId?: string;
  saveStatus: SaveStatus;
  saveError?: string;
  setActivePageId: (pageId: string) => void;
  setSelectedElementId: (elementId?: string) => void;
  setIsEditMode: (isEditMode: boolean) => void;
  setIsPreviewing: (isPreviewing: boolean) => void;
  toggleEditMode: () => void;
  updateElement: (
    pageId: string,
    elementId: string,
    patch: Partial<EditableElement>,
  ) => void;
  addElement: (
    pageId: string,
    element: NewEditableElement,
  ) => void;
  deleteElement: (pageId: string, elementId: string) => void;
  duplicateElement: (pageId: string, elementId: string) => void;
  saveLayout: () => Promise<void>;
  uploadAsset: (file: File) => Promise<string>;
}

const LayoutEditorContext = createContext<LayoutEditorContextValue | null>(
  null,
);

const canEditLayout = import.meta.env.DEV;
const PAPERCLIP_LAYER = 1000000;

const readInitialEditMode = () => {
  if (!canEditLayout || typeof window === "undefined") {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  return (
    params.get("edit") === "1" ||
    window.sessionStorage.getItem("layoutEditorEnabled") === "1"
  );
};

const createId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;

const mapPage = (
  layout: EditableLayoutDocument,
  pageId: string,
  updater: (page: EditablePage) => EditablePage,
): EditableLayoutDocument => ({
  ...layout,
  pages: layout.pages.map((page) => (page.id === pageId ? updater(page) : page)),
});

const isPaperclipElement = (element: EditableElement) =>
  element.type === "image" &&
  ((element as EditableImageElement).assetId === "paperclip" ||
    element.id.toLowerCase().includes("paperclip"));

const normalizeElement = (element: EditableElement): EditableElement => {
  if (element.type !== "image") {
    return element;
  }

  return {
    ...element,
    objectFit: "contain",
    zIndex: isPaperclipElement(element) ? PAPERCLIP_LAYER : element.zIndex,
  };
};

const normalizeLayout = (
  document: EditableLayoutDocument,
): EditableLayoutDocument => ({
  ...document,
  pages: document.pages.map((page) => ({
    ...page,
    elements: page.elements.map(normalizeElement),
  })),
});

const readJson = async <T,>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<T>;
};

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });

export function LayoutEditorProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState<EditableLayoutDocument>(
    normalizeLayout(initialLayout as EditableLayoutDocument),
  );
  const [isEditMode, setEditMode] = useState(readInitialEditMode);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [activePageId, setActivePageId] = useState<string>();
  const [selectedElementId, setSelectedElementId] = useState<string>();
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState<string>();

  const setIsEditMode = useCallback((nextMode: boolean) => {
    if (!canEditLayout) {
      return;
    }

    setEditMode(nextMode);
    window.sessionStorage.setItem("layoutEditorEnabled", nextMode ? "1" : "0");
    if (!nextMode) {
      setSelectedElementId(undefined);
      setIsPreviewing(false);
    }
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(!isEditMode);
  }, [isEditMode, setIsEditMode]);

  useEffect(() => {
    if (!canEditLayout) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "e") {
        event.preventDefault();
        setEditMode((current) => {
          const next = !current;
          window.sessionStorage.setItem("layoutEditorEnabled", next ? "1" : "0");
          return next;
        });
      }

      if (event.key === "Escape") {
        setSelectedElementId(undefined);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!canEditLayout) {
      return;
    }

    fetch("/__layout-editor/layout")
      .then((response) => readJson<EditableLayoutDocument>(response))
      .then((document) => setLayout(normalizeLayout(document)))
      .catch(() => {
        // The committed JSON import is still available if the dev endpoint fails.
      });
  }, []);

  const updateElement = useCallback(
    (pageId: string, elementId: string, patch: Partial<EditableElement>) => {
      setLayout((current) =>
        mapPage(current, pageId, (page) => ({
          ...page,
          elements: page.elements.map((element) =>
            element.id === elementId
              ? normalizeElement({ ...element, ...patch } as EditableElement)
              : element,
          ),
        })),
      );
      setSaveStatus("idle");
    },
    [],
  );

  const addElement = useCallback<LayoutEditorContextValue["addElement"]>(
    (pageId, element) => {
      setLayout((current) =>
        mapPage(current, pageId, (page) => {
          const nextZ =
            Math.max(0, ...page.elements.map((item) => item.zIndex)) + 1;
          const nextElement = {
            ...element,
            id: element.id ?? createId(element.type),
            zIndex: element.zIndex ?? nextZ,
          } as EditableElement;

          const normalizedElement = normalizeElement(nextElement);

          setSelectedElementId(normalizedElement.id);
          return {
            ...page,
            elements: [...page.elements, normalizedElement],
          };
        }),
      );
      setSaveStatus("idle");
    },
    [],
  );

  const deleteElement = useCallback((pageId: string, elementId: string) => {
    setLayout((current) =>
      mapPage(current, pageId, (page) => ({
        ...page,
        elements: page.elements.filter((element) => element.id !== elementId),
      })),
    );
    setSelectedElementId(undefined);
    setSaveStatus("idle");
  }, []);

  const duplicateElement = useCallback((pageId: string, elementId: string) => {
    setLayout((current) =>
      mapPage(current, pageId, (page) => {
        const element = page.elements.find((item) => item.id === elementId);
        if (!element) {
          return page;
        }

        const duplicate = {
          ...element,
          id: createId(element.type),
          x: element.x + 3,
          y: element.y + 3,
          zIndex: Math.max(0, ...page.elements.map((item) => item.zIndex)) + 1,
        } as EditableElement;
        const normalizedDuplicate = normalizeElement(duplicate);

        setSelectedElementId(normalizedDuplicate.id);
        return { ...page, elements: [...page.elements, normalizedDuplicate] };
      }),
    );
    setSaveStatus("idle");
  }, []);

  const saveLayout = useCallback(async () => {
    if (!canEditLayout) {
      return;
    }

    setSaveStatus("saving");
    setSaveError(undefined);

    try {
      const normalizedLayout = normalizeLayout(layout);
      await fetch("/__layout-editor/layout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedLayout),
      }).then((response) => {
        if (!response.ok) {
          return response.text().then((message) => {
            throw new Error(message || "Unable to save layout.");
          });
        }
        return undefined;
      });
      setLayout(normalizedLayout);
      setSaveStatus("saved");
    } catch (error) {
      setSaveStatus("error");
      setSaveError(error instanceof Error ? error.message : "Unable to save.");
    }
  }, [layout]);

  const uploadAsset = useCallback(async (file: File) => {
    if (!canEditLayout) {
      throw new Error("Asset uploads are only available during local dev.");
    }

    const dataUrl = await fileToDataUrl(file);
    const response = await fetch("/__layout-editor/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, dataUrl }),
    });
    const payload = await readJson<{ src: string }>(response);
    return payload.src;
  }, []);

  const value = useMemo<LayoutEditorContextValue>(
    () => ({
      canEdit: canEditLayout,
      isEditMode,
      isPreviewing,
      layout,
      activePageId,
      selectedElementId,
      saveStatus,
      saveError,
      setActivePageId,
      setSelectedElementId,
      setIsEditMode,
      setIsPreviewing,
      toggleEditMode,
      updateElement,
      addElement,
      deleteElement,
      duplicateElement,
      saveLayout,
      uploadAsset,
    }),
    [
      activePageId,
      addElement,
      deleteElement,
      duplicateElement,
      isEditMode,
      isPreviewing,
      layout,
      saveError,
      saveLayout,
      saveStatus,
      selectedElementId,
      setIsEditMode,
      toggleEditMode,
      updateElement,
      uploadAsset,
    ],
  );

  return (
    <LayoutEditorContext.Provider value={value}>
      {children}
    </LayoutEditorContext.Provider>
  );
}

export const useLayoutEditor = () => {
  const context = useContext(LayoutEditorContext);
  if (!context) {
    throw new Error("useLayoutEditor must be used inside LayoutEditorProvider.");
  }
  return context;
};
