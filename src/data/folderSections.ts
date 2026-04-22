export type FolderAccentStyle = "script" | "stamp" | "typewritten";

export interface FolderSection {
  id: "work" | "about" | "archive" | "experiments" | "contact";
  label: string;
  shortCode: string;
  annotation: string;
  accentStyle: FolderAccentStyle;
  stampText: string;
  marginNote: string;
  placeholderContent: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
    footer: string;
  };
}

export type FolderSectionId = FolderSection["id"];

export const folderSections: FolderSection[] = [
  {
    id: "work",
    label: "Home",
    shortCode: "SL-01",
    annotation: "Portfolio landing page.",
    accentStyle: "script",
    stampText: "Home",
    marginNote: "Landing page with portfolio introduction.",
    placeholderContent: {
      eyebrow: "Portfolio Home",
      title: "Welcome to my portfolio!",
      body:
        "hello! please look at my projects, where I work across.",
      bullets: [],
      footer: "Home presentation layout.",
    },
  },
  {
    id: "about",
    label: "Creative direction",
    shortCode: "SL-02",
    annotation: "Levi's campaign concept page with layered imagery and process marks.",
    accentStyle: "typewritten",
    stampText: "Creative Direction",
    marginNote: "Levi's campaign concept for a digital nomad audience.",
    placeholderContent: {
      eyebrow: "Campaign Study",
      title: "LEVI'S CAMPAIGN",
      body:
        "Fit For Wherever is a campaign concept developed for Levi's, targeting the digital nomad lifestyle. The creative idea: wherever life takes you, denim is already there. In an era where travel is increasingly performed for an audience, the campaign leans into authenticity, positioning Levi's jeans as more than clothing, but a dependable, grounding companion through the unpredictable",
      bullets: [],
      footer: "Levi's campaign concept sheet.",
    },
  },
  {
    id: "archive",
    label: "Brand Identity",
    shortCode: "SL-03",
    annotation: "Older work, references, and filed fragments for slower browsing.",
    accentStyle: "stamp",
    stampText: "Archive Copy",
    marginNote: "For catalogued fragments, references, and ephemera.",
    placeholderContent: {
      eyebrow: "Campaign Study",
      title: "LEVI'S CAMPAIGN",
      body:
        "Fit For Wherever is a campaign concept developed for Levi's, targeting the digital nomad lifestyle. The creative idea: wherever life takes you, denim is already there. In an era where travel is increasingly performed for an audience, the campaign leans into authenticity, positioning Levi's jeans as more than clothing, but a dependable, grounding companion through the unpredictable",
      bullets: [],
      footer: "Levi's campaign concept sheet.",
    },
  },
  {
    id: "experiments",
    label: "Strategy & Concept",
    shortCode: "SL-04",
    annotation: "Space for side studies, tests, and visual trials.",
    accentStyle: "script",
    stampText: "Studio Test",
    marginNote: "Loose drafts, ideas, and unfinished investigations.",
    placeholderContent: {
      eyebrow: "Campaign Study",
      title: "LEVI'S CAMPAIGN",
      body:
        "Fit For Wherever is a campaign concept developed for Levi's, targeting the digital nomad lifestyle. The creative idea: wherever life takes you, denim is already there. In an era where travel is increasingly performed for an audience, the campaign leans into authenticity, positioning Levi's jeans as more than clothing, but a dependable, grounding companion through the unpredictable",
      bullets: [],
      footer: "Levi's campaign concept sheet.",
    },
  },
  {
    id: "contact",
    label: "Contact",
    shortCode: "SL-05",
    annotation: "Direct contact details and simple inquiry pathways.",
    accentStyle: "typewritten",
    stampText: "Reply Requested",
    marginNote: "Reserved for email, socials, or inquiry information.",
    placeholderContent: {
      eyebrow: "Campaign Study",
      title: "LEVI'S CAMPAIGN",
      body:
        "Fit For Wherever is a campaign concept developed for Levi's, targeting the digital nomad lifestyle. The creative idea: wherever life takes you, denim is already there. In an era where travel is increasingly performed for an audience, the campaign leans into authenticity, positioning Levi's jeans as more than clothing, but a dependable, grounding companion through the unpredictable",
      bullets: [],
      footer: "Levi's campaign concept sheet.",
    },
  },
];
