import type { FolderSectionId } from "./folderSections";

export type EditableElementType = "text" | "image" | "shape";
export type EditableShapeKind = "rectangle" | "ellipse" | "plus";
export type EditableTabShape = "file" | "pill" | "angled" | "ticket";

export interface EditableBaseElement {
  id: string;
  type: EditableElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  locked?: boolean;
  hidden?: boolean;
}

export interface EditableTextElement extends EditableBaseElement {
  type: "text";
  text: string;
  fontSize: number;
  lineHeight: number;
  fontFamily: "sans" | "body";
  fontWeight: number;
  letterSpacing?: number;
  color: string;
  textAlign: "left" | "center" | "right" | "justify";
}

export interface EditableImageElement extends EditableBaseElement {
  type: "image";
  assetId?: string;
  src?: string;
  alt?: string;
  objectFit: "contain";
  objectPosition: string;
  opacity?: number;
}

export interface EditableShapeElement extends EditableBaseElement {
  type: "shape";
  shape: EditableShapeKind;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
  opacity?: number;
}

export type EditableElement =
  | EditableTextElement
  | EditableImageElement
  | EditableShapeElement;

export type NewEditableElement =
  | (Omit<EditableTextElement, "id" | "zIndex"> &
      Partial<Pick<EditableTextElement, "id" | "zIndex">>)
  | (Omit<EditableImageElement, "id" | "zIndex"> &
      Partial<Pick<EditableImageElement, "id" | "zIndex">>)
  | (Omit<EditableShapeElement, "id" | "zIndex"> &
      Partial<Pick<EditableShapeElement, "id" | "zIndex">>);

export interface EditablePage {
  id: string;
  sectionId: FolderSectionId;
  name: string;
  elements: EditableElement[];
}

export interface EditableTabStyle {
  shape: EditableTabShape;
  railInset: number;
  gap: number;
  height: number;
  bodyInset: number;
  cornerRadius: number;
  shoulderSize: number;
  slant: number;
  activeOffset: number;
  labelScale: number;
}

export interface EditableLayoutDocument {
  version: 1;
  tabStyle?: EditableTabStyle;
  pages: EditablePage[];
}
