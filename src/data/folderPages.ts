import conceptStampImage from "../assets/creative-direction/concept.png";
import copyWritingStampImage from "../assets/creative-direction/copy-writing.png";
import graphicDesignStampImage from "../assets/creative-direction/graphic-design.png";
import nylonPhotoImage from "../assets/creative-direction/nylon_photo.png";
import laManuelaCoverImage from "../../inspo/la manuela/lamanu_firstlayer.png";
import laManuelaVisionImage from "../../inspo/la manuela/lamanu_second.png";
import laManuelaMeaningImage from "../../inspo/la manuela/lamanu_third.png";
import laManuelaMoodboardImage from "../../inspo/la manuela/lamanu_fourth.png";
import type { FolderSection, FolderSectionId } from "./folderSections";

export type ContentPanelLayout = "default" | "brandIdentity";

export interface FolderPageConfig {
  id: string;
  referenceName?: string;
  aliases?: string[];
  sectionId: FolderSectionId;
  layout?: ContentPanelLayout;
  content: FolderSection["placeholderContent"];
  copyBlockWidth?: string;
  titleWhiteSpace?: "normal" | "nowrap" | "pre-line";
  titleLineHeight?: string;
  titleTextAlign?: "left" | "center" | "right";
  titleMaxWidth?: string;
  bodyWidth?: string;
  bodyMaxWidth?: string;
  bodyMarginTop?: string;
  bodyFontSize?: string;
  bodyLineHeight?: string;
  bodyLetterSpacing?: string;
  bodyTextAlign?: "left" | "center" | "right";
  brandIdentityBackdropImageSrc?: string;
  brandIdentityStackImageSrcs?: string[];
  brandIdentityStampLabels?: string[];
  levelBrandIdentityBackdrop?: boolean;
  hideBrandIdentityTopPhoto?: boolean;
  omitPlanningStamp?: boolean;
  stampImageSrcs?: string[];
}

// Edit page text and per-page visual overrides here. Use referenceName and
// aliases for human-readable page references that match the visible headers.
// Duplicated pages should copy the content object so each page can be changed
// independently later.
export const folderPagesBySectionId: Partial<
  Record<FolderSectionId, FolderPageConfig[]>
> = {
  about: [
    {
      id: "levis-campaign",
      referenceName: "LEVI'S CAMPAIGN",
      aliases: ["Levi's Campaign", "Levis Campaign", "Fit For Wherever"],
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
      id: "hunter-campaign",
      referenceName: "HUNTER CAMPAIGN",
      aliases: ["Hunter Campaign", "Hunter Wellington"],
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
      id: "nylon-editorial",
      referenceName: "NYLON EDITORIAL",
      aliases: ["Nylon Editorial", "The Post-Clean Girl Era"],
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
      id: "tomorrowland-rebrand",
      referenceName: "TOMORROWLAND REBRAND",
      aliases: ["Tomorrowland", "Tomorrowland Rebrand"],
      sectionId: "archive",
      layout: "brandIdentity",
      content: {
        eyebrow: "Campaign Study",
        title: "TOMORROWLAND REBRAND",
        body:
          "A reimagining of Tomorrowland's visual identity, drawing inspiration from Woodstock's ethos of \"3 days of peace and music\" and translating it for a modern audience. The concept informed every creative decision – from the artist lineup curation to the logo, typography, and colour system – resulting in a cohesive identity applied consistently across multiple assets.",
        bullets: [],
        footer: "Tomorrowland rebrand concept sheet.",
      },
      copyBlockWidth: "min(100%, 580px)",
      titleWhiteSpace: "nowrap",
      titleTextAlign: "right",
      titleMaxWidth: "38ch",
      bodyWidth: "auto",
      bodyMaxWidth: "38ch",
      stampImageSrcs: [
        conceptStampImage,
        graphicDesignStampImage,
        copyWritingStampImage,
      ],
    },
    {
      id: "la-manuela",
      referenceName: "LA MANUELA",
      aliases: ["La Manuela", "La Manuela Rebrand", "La Ronda"],
      sectionId: "archive",
      layout: "brandIdentity",
      content: {
        eyebrow: "Brand Strategy",
        title: "LA MANUELA",
        body:
          "A brand strategy project for La Manuela, a historic Madrid cafe with strong local roots but an undefined identity. Rooted in the insight that modern social life lacks spaces for meaningful, offline connection, the rebrand repositions the venue as La Ronda — a culturally grounded concept built around analogue play and intentional togetherness. The project encompassed full brand development: naming, positioning, brand pillars, tone of voice, and visual identity.",
        bullets: [],
        footer: "La Manuela rebrand concept sheet.",
      },
      copyBlockWidth: "min(100%, 620px)",
      bodyWidth: "100%",
      bodyMaxWidth: "44ch",
      bodyTextAlign: "right",
      brandIdentityStackImageSrcs: [
        laManuelaCoverImage,
        laManuelaVisionImage,
        laManuelaMeaningImage,
        laManuelaMoodboardImage,
      ],
      brandIdentityStampLabels: ["Strategy", "Pitch\nDeck", "Visual\nIdentity"],
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
