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
      eyebrow: "Stored Matter",
      title: "Archive Drawer In Progress",
      body:
        "The archive section can later hold older work, references, visual research, and unfinished pieces that still deserve a place in the portfolio ecosystem.",
      bullets: [
        "Past projects and supportive process material",
        "Editorial scraps, scans, and visual references",
        "A slower, more exploratory presentation mode",
      ],
      footer: "Best suited to layered grids or diary-like entries later.",
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
      eyebrow: "Working Notes",
      title: "Experiments, Tests, and Fragments",
      body:
        "This panel is intentionally more open-ended. It can later house motion studies, material tests, poster drafts, or image experiments without breaking the archival tone of the site.",
      bullets: [
        "Concept sketches and in-progress studies",
        "Motion, print, and mixed-media experiments",
        "A place for roughness that still feels curated",
      ],
      footer: "Built to support irregular formats and evolving content.",
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
      eyebrow: "Correspondence",
      title: "Contact Sheet Ready For Details",
      body:
        "This final tab can later hold email, representation, social links, or a brief invitation to get in touch. The design already frames it like the last sheet in a real working folder.",
      bullets: [
        "Email and direct inquiry information",
        "Optional location, availability, or representation",
        "Social or publication links if desired",
      ],
      footer: "Kept intentionally calm and clear for future contact details.",
    },
  },
];
