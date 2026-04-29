import conceptStampImage from "../assets/creative-direction/concept.png";
import copyWritingStampImage from "../assets/creative-direction/copy-writing.png";
import graphicDesignStampImage from "../assets/creative-direction/graphic-design.png";
import nylonPhotoImage from "../assets/creative-direction/nylon_photo.png";
import laManuelaCoverImage from "../../inspo/la manuela/lamanu_firstlayer.png";
import laManuelaVisionImage from "../../inspo/la manuela/lamanu_second.png";
import laManuelaMeaningImage from "../../inspo/la manuela/lamanu_third.png";
import laManuelaMoodboardImage from "../../inspo/la manuela/lamanu_fourth.png";
import laManuelaStrategyStampImage from "../../inspo/strategy.png";
import laManuelaPitchDeckStampImage from "../../inspo/pitch deck.png";
import spotifyCoverImage from "../../inspo/spotify/sp1.png";
import spotifyConceptImage from "../../inspo/spotify/sp2.png";
import spotifyContentIdeasImage from "../../inspo/spotify/sp3.png";
import spotifyMoodboardImage from "../../inspo/spotify/sp4.png";
import tomorrowlandPosterImage from "../../inspo/tomorrowland /1st.png";
import tomorrowlandInstagramImage from "../../inspo/tomorrowland /2nd.png";
import tomorrowlandVinylImage from "../../inspo/tomorrowland /3rd.png";
import tomorrowlandSteviePosterImage from "../../inspo/tomorrowland /4th.png";
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
  copyBlockMaxWidth?: string;
  copyBlockJustifySelf?: "start" | "center" | "end" | "stretch";
  copyBlockAlignSelf?: "start" | "center" | "end" | "stretch";
  copyBlockShiftX?: string;
  copyBlockShiftY?: string;
  titleWidth?: string;
  titleWhiteSpace?: "normal" | "nowrap" | "pre-line";
  titleFontSize?: string;
  titleLineHeight?: string;
  titleLetterSpacing?: string;
  titleTextAlign?: "left" | "center" | "right";
  titleMaxWidth?: string;
  titleMarginTop?: string;
  titleMarginBottom?: string;
  titleShiftX?: string;
  titleShiftY?: string;
  bodyWidth?: string;
  bodyMinWidth?: string;
  bodyMaxWidth?: string;
  bodyMarginTop?: string;
  bodyMarginBottom?: string;
  bodyFontSize?: string;
  bodyLineHeight?: string;
  bodyLetterSpacing?: string;
  bodyTextAlign?: "left" | "center" | "right";
  bodyShiftX?: string;
  bodyShiftY?: string;
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
      titleMaxWidth: "50ch",
      // Move only the Tomorrowland title by changing these two values.
      // Positive X moves right, negative X moves left; positive Y moves down.
      titleShiftX: "-70px",
      titleShiftY: "0px",
      bodyWidth: "auto",
      bodyMaxWidth: "38ch",
      brandIdentityStackImageSrcs: [
        tomorrowlandVinylImage,
        tomorrowlandPosterImage,
        tomorrowlandSteviePosterImage,
        tomorrowlandInstagramImage,
      ],
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
      stampImageSrcs: [
        laManuelaStrategyStampImage,
        laManuelaPitchDeckStampImage,
      ],
    },
  ],
  experiments: [
    {
      id: "strategy-concept-page-1",
      referenceName: "SPOTIFY CONTENT STRATEGY",
      aliases: ["Spotify", "Spotify Content Strategy"],
      sectionId: "experiments",
      layout: "brandIdentity",
      content: {
        eyebrow: "Brand Strategy",
        title: "SPOTIFY CONTENT STRATEGY",
        body:
          "A brand ambassador program pitched to Spotify, built around the insight that while Spotify dominates music culture digitally, it has little presence in the physical spaces where that culture actually lives – nightlife. The concept positions a nightlife influencer as a cultural translator for Gen Z women, using music to reframe the party girl narrative. The pitch covered brand analysis, competitor landscape, audience profiling, creative concept, and a full content strategy.",
        bullets: [],
        footer: "Spotify content strategy concept sheet.",
      },
      copyBlockWidth: "min(100%, 660px)",
      copyBlockMaxWidth: "700px",
      copyBlockJustifySelf: "center",
      copyBlockAlignSelf: "center",
      // Move the whole Spotify text group with these two values.
      // Positive X moves right, negative X moves left; positive Y moves down.
      copyBlockShiftX: "0px",
      copyBlockShiftY: "0px",
      titleWidth: "130%",
      titleWhiteSpace: "normal",
      titleFontSize: "clamp(1rem, 2vw, 3.7rem)",
      titleLineHeight: "0.82",
      titleLetterSpacing: "-0.055em",
      titleMaxWidth: "100ch",
      titleTextAlign: "right",
      // Move only the Spotify title by changing these two values.
      // Positive X moves right, negative X moves left; positive Y moves down.
      titleShiftX: "-90px",
      titleShiftY: "0px",
      bodyWidth: "110%",
      bodyMinWidth: "0",
      bodyMaxWidth: "48ch",
      bodyMarginTop: "clamp(18px, 2.2vw, 28px)",
      bodyFontSize: "clamp(1rem, 1vw, 1rem)",
      bodyLineHeight: "1.47",
      bodyLetterSpacing: "-0.03em",
      bodyTextAlign: "right",
      // Move only the Spotify body copy with these two values.
      // Positive X moves right, negative X moves left; positive Y moves down.
      bodyShiftX: "-30px",
      bodyShiftY: "0px",
      brandIdentityStackImageSrcs: [
        spotifyCoverImage,
        spotifyConceptImage,
        spotifyContentIdeasImage,
        spotifyMoodboardImage,
      ],
      stampImageSrcs: [
        laManuelaStrategyStampImage,
        laManuelaPitchDeckStampImage,
      ],
    },
  ],
};
