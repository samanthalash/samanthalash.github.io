import conceptStampImage from "../assets/creative-direction/concept.png";
import copyWritingStampImage from "../assets/creative-direction/copy-writing.png";
import graphicDesignStampImage from "../assets/creative-direction/graphic-design.png";
import nylonPhotoImage from "../assets/creative-direction/nylon_photo.png";
import type { FolderSection, FolderSectionId } from "./folderSections";

export type ContentPanelLayout = "default" | "brandIdentity";

export interface FolderPageConfig {
  id: string;
  sectionId: FolderSectionId;
  layout?: ContentPanelLayout;
  content: FolderSection["placeholderContent"];
  copyBlockWidth?: string;
  bodyWidth?: string;
  bodyMaxWidth?: string;
  bodyMarginTop?: string;
  bodyFontSize?: string;
  bodyLineHeight?: string;
  bodyLetterSpacing?: string;
  bodyTextAlign?: "left" | "center" | "right";
  brandIdentityBackdropImageSrc?: string;
  levelBrandIdentityBackdrop?: boolean;
  hideBrandIdentityTopPhoto?: boolean;
  omitPlanningStamp?: boolean;
  stampImageSrcs?: string[];
}

// Edit page text and per-page visual overrides here. Duplicated pages should
// copy the content object so each page can be changed independently later.
export const folderPagesBySectionId: Partial<
  Record<FolderSectionId, FolderPageConfig[]>
> = {
  about: [
    {
      id: "creative-direction-page-1",
      sectionId: "about",
      content: {
        eyebrow: "Campaign Study",
        title: "LEVI'S CAMPAIGN",
        body:
          "Fit For Wherever is a campaign concept developed for Levi's, targeting the digital nomad lifestyle. The creative idea: wherever life takes you, denim is already there. In an era where travel is increasingly performed for an audience, the campaign leans into authenticity, positioning Levi's jeans as more than clothing, but a dependable, grounding companion through the unpredictable",
        bullets: [],
        footer: "Levi's campaign concept sheet.",
      },
      copyBlockWidth: "min(100%, 560px)",
      bodyWidth: "auto",
      bodyMaxWidth: "35ch",
    },
    {
      id: "creative-direction-page-2",
      sectionId: "archive",
      layout: "brandIdentity",
      content: {
        eyebrow: "Campaign Study",
        title: "HUNTER CAMPAIGN",
        body:
          "A conceptual campaign for Hunter Wellington, built around a single creative constraint: sell the boot without showing it. Rooted in the insight that Y2K's comeback has cemented the Wellington as a festival essential for Gen Z, the visual tells the story entirely through context — a flatlay of festival essentials laid out on grass, the boots absent. The red props bring the frame back to Hunter's iconic brand colour, making the missing product impossible to forget.",
        bullets: [],
        footer: "Hunter Wellington campaign concept sheet.",
      },
      copyBlockWidth: "min(100%, 580px)",
      bodyWidth: "auto",
      bodyMaxWidth: "38ch",
    },
    {
      id: "creative-direction-page-3",
      sectionId: "archive",
      layout: "brandIdentity",
      content: {
        eyebrow: "Campaign Study",
        title: "NYLON EDITORIAL",
        body:
          "An editorial project for Nylon, creating an original article and accompanying visual from concept to execution. The piece, “The Post-Clean Girl Era,”  explores the shift from minimalist beauty toward expressive, Y2K-inflected glam, written in Nylon's culturally fluent, trend-led tone. The cover image was designed to match the brand's bold, graphic visual identity, translating the editorial concept into a cohesive digital article format.",
        bullets: [],
        footer: "Hunter Wellington campaign concept sheet.",
      },
      copyBlockWidth: "min(100%, 680px)",
      bodyWidth: "101%",
      bodyMaxWidth: "50ch",
      bodyTextAlign: "right",
      brandIdentityBackdropImageSrc: nylonPhotoImage,
      hideBrandIdentityTopPhoto: true,
      levelBrandIdentityBackdrop: true,
      omitPlanningStamp: true,
      stampImageSrcs: [
        conceptStampImage,
        graphicDesignStampImage,
        copyWritingStampImage,
      ],
    },
  ],
  archive: [
    {
      id: "brand-identity-page-1",
      sectionId: "archive",
      layout: "brandIdentity",
      content: {
        eyebrow: "Campaign Study",
        title: "HUNTER CAMPAIGN",
        body:
          "A conceptual campaign for Hunter Wellington, built around a single creative constraint: sell the boot without showing it. Rooted in the insight that Y2K's comeback has cemented the Wellington as a festival essential for Gen Z, the visual tells the story entirely through context — a flatlay of festival essentials laid out on grass, the boots absent. The red props bring the frame back to Hunter's iconic brand colour, making the missing product impossible to forget.",
        bullets: [],
        footer: "Hunter Wellington campaign concept sheet.",
      },
      copyBlockWidth: "min(100%, 580px)",
      bodyWidth: "auto",
      bodyMaxWidth: "38ch",
    },
  ],
  experiments: [
    {
      id: "strategy-concept-page-1",
      sectionId: "experiments",
      content: {
        eyebrow: "Campaign Study",
        title: "LEVI'S CAMPAIGN",
        body:
          "Fit For Wherever is a campaign concept developed for Levi's, targeting the digital nomad lifestyle. The creative idea: wherever life takes you, denim is already there. In an era where travel is increasingly performed for an audience, the campaign leans into authenticity, positioning Levi's jeans as more than clothing, but a dependable, grounding companion through the unpredictable",
        bullets: [],
        footer: "Levi's campaign concept sheet.",
      },
      copyBlockWidth: "min(100%, 560px)",
      bodyWidth: "auto",
      bodyMaxWidth: "35ch",
    },
  ],
};
