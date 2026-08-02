import stampLogo from "../assets/brand/stamp-logo.png";
import hunterHero from "../assets/projects/hunter/hero.png";
import hunterBillboard from "../assets/projects/hunter/billboard.png";
import levisBeach from "../assets/projects/levis/beach.png";
import levisDesert from "../assets/projects/levis/desert.png";
import levisBillboard from "../assets/projects/levis/billboard.png";
import levisCyclist from "../assets/projects/levis/cyclist.png";
import aprampOverview from "../assets/projects/apramp/overview.png";
import aprampCover from "../assets/projects/apramp/cover.png";
import aprampCampaignBoard from "../assets/projects/apramp/campaign-board.png";
import aprampGiftBox from "../assets/projects/apramp/gift-box.png";
import aprampInside from "../assets/projects/apramp/inside-installation.png";
import aprampExecution from "../assets/projects/apramp/execution-plan.png";
import aprampSocialMedia from "../assets/projects/apramp/social-media.png";
import aprampInstallation from "../assets/projects/apramp/installation.png";
import tomorrowlandOverview from "../assets/projects/tomorrowland/overview.png";
import tomorrowlandPoster from "../assets/projects/tomorrowland/poster.png";
import tomorrowlandInstagram from "../assets/projects/tomorrowland/instagram.png";
import tomorrowlandVinyl from "../assets/projects/tomorrowland/vinyl.png";
import laManuelaOverview from "../assets/projects/la-manuela/overview.png";
import laManuelaCover from "../assets/projects/la-manuela/cover.png";
import laManuelaVision from "../assets/projects/la-manuela/vision.png";
import laManuelaMeaning from "../assets/projects/la-manuela/meaning.png";
import laManuelaMoodboard from "../assets/projects/la-manuela/moodboard.png";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  displayTitle: string;
  category: string;
  disciplines: string[];
  context: string;
  role: string;
  insight: string;
  solution: string;
  tools: string[];
  hero: ProjectImage;
  gallery: ProjectImage[];
  layout: "portrait" | "landscape" | "overview";
  fullCampaignHref?: string;
}

export const site = {
  name: "Samantha Lash",
  logo: stampLogo,
  summary:
    "Passionate about art direction and brand strategy, building concepts from human insight to cohesive executions.",
  email: "samanthalash28@gmail.com",
  linkedin: "https://www.linkedin.com/in/samanthalash/",
  phone: "+34 641 984 149",
} as const;

export const projects: Project[] = [
  {
    slug: "hunter-campaign",
    number: "01",
    title: "Hunter Campaign",
    displayTitle: "HUNTER\nCAMPAIGN",
    category: "Creative Direction",
    disciplines: ["creative direction"],
    context:
      "A conceptual campaign for Hunter Wellington built around a single creative constraint: sell the boot without ever showing it.",
    role:
      "Conceptualization, Art Direction, Styling, Photography, Editing, Mockup.",
    insight:
      "The Y2K revival has re-established the Wellington boot as a defining symbol of Gen Z festival culture, making it instantly recognizable even in its absence.",
    solution:
      "A festival essentials flatlay that tells the story through what's left behind rather than what's shown. The curated essentials, muddy footprints, and Hunter's signature red palette evoke the brand without revealing the product, allowing the missing boot to become the focal point.",
    tools: ["Adobe Photoshop", "Gen AI"],
    hero: { src: hunterHero, alt: "Hunter festival essentials campaign flatlay" },
    gallery: [
      { src: hunterBillboard, alt: "Hunter campaign shown on a city billboard" },
    ],
    layout: "portrait",
  },
  {
    slug: "levis-campaign",
    number: "02",
    title: "Levi's Campaign",
    displayTitle: "LEVI'S\nCAMPAIGN",
    category: "Creative Direction",
    disciplines: ["creative direction"],
    context: "A campaign concept for Levi's targetting digital nomads and Gen Z.",
    role: "Conceptualization, Pitching, Art Direction, Styling, Mockups.",
    insight:
      "For digital nomads, life is defined by constant movement, making versatile, reliable essentials more valuable than ever.",
    solution:
      "Position Levi's jeans as more than clothing, but a grounding companion through the unpredictable. Built around the idea \"Wherever life takes you, denim is already there,\" the campaign reframes denim as the one constant across every destination.",
    tools: ["Studio Equipment", "Adobe Photoshop", "Gen AI"],
    hero: { src: levisBeach, alt: "Levi's Fit For Wherever beach campaign" },
    gallery: [
      { src: levisDesert, alt: "Levi's Fit For Wherever desert campaign" },
      { src: levisBillboard, alt: "Levi's beach campaign on a street billboard" },
      { src: levisCyclist, alt: "Levi's desert campaign on an outdoor billboard" },
    ],
    layout: "landscape",
  },
  {
    slug: "apramp-campaign",
    number: "03",
    title: "APRAMP Campaign",
    displayTitle: "APRAMP\nCAMPAIGN",
    category: "Strategy + Social Impact",
    disciplines: ["strategy", "social impact"],
    context:
      "A campaign for APRAMP, a frontline organisation combating human trafficking in Spain, raising awareness of how human trafficking begins through deceptive online recruitment.",
    role:
      "Project lead; conceptualization, communications, event coordination, social media management.",
    insight:
      "While many people know human trafficking exists, few recognize how it begins. Recruitment often appears ordinary, hidden behind false promises of love, money, or opportunity.",
    solution:
      "False Promises, an immersive walk-in installation that transforms the hidden process of online recruitment into a public experience. Supported by guerrilla activation, print collateral, a dedicated website, and social strategy, the campaign urges audiences recognize the early signs of exploitation.",
    tools: ["Adobe Illustrator", "Instagram", "TikTok"],
    hero: { src: aprampCampaignBoard, alt: "APRAMP False Promises campaign overview" },
    gallery: [
      { src: aprampInstallation, alt: "False Promises installation in El Retiro Park" },
      { src: aprampSocialMedia, alt: "False Promises social media campaign" },
      { src: aprampOverview, alt: "APRAMP campaign creative brief" },
      { src: aprampGiftBox, alt: "False Promises gift box concept" },
      { src: aprampCover, alt: "APRAMP campaign presentation cover" },
      { src: aprampInside, alt: "Interior of the False Promises installation" },
      { src: aprampExecution, alt: "APRAMP campaign execution plan" },
    ],
    layout: "overview",
    fullCampaignHref: "/assets/FINAL-APRAMP-PRESENTATION.pdf",
  },
  {
    slug: "tomorrowland-rebrand",
    number: "04",
    title: "Tomorrowland Rebrand",
    displayTitle: "TOMORROWLAND\nREBRAND",
    category: "Brand Identity",
    disciplines: ["brand identity"],
    context:
      "A reimagined visual identity for Tomorrowland inspired by Woodstock's ethos of \"3 days of peace and music.\"",
    role: "Conceptualization, Graphic Design, Mockups.",
    insight:
      "Woodstock's message of peace, music, and community remains timeless. Reinterpreting its visual language for today offers a way to reconnect Tomorrowland with those same values through a contemporary lens.",
    solution:
      "Woodstock's spirit translated into a modern visual identity, using the concept to guide every creative decision. From the logo, typography, and colour system to the artist lineup and brand applications, the identity was designed as one cohesive system.",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
    hero: { src: tomorrowlandPoster, alt: "Tomorrowland rebrand festival poster" },
    gallery: [
      { src: tomorrowlandOverview, alt: "Tomorrowland rebrand overview" },
      { src: tomorrowlandInstagram, alt: "Tomorrowland rebrand Instagram profile" },
      { src: tomorrowlandVinyl, alt: "Tomorrowland rebrand vinyl application" },
    ],
    layout: "portrait",
  },
  {
    slug: "la-manuela-rebrand",
    number: "05",
    title: "La Manuela Rebrand",
    displayTitle: "LA MANUELA\nREBRAND",
    category: "Brand Identity",
    disciplines: ["brand identity"],
    context:
      "A brand strategy project reimagining La Manuela, a historic Madrid café, as La Ronda—a concept centred on analogue play and intentional togetherness.",
    role: "Conceptualization, Strategy, Moodboard.",
    insight:
      "As social interactions become increasingly digital, people are craving spaces that encourage genuine, offline connection and shared experiences.",
    solution:
      "Repositioned the café as La Ronda, a culturally grounded brand built around analogue play as a catalyst for community. The project included naming, positioning, brand pillars, tone of voice, and a complete visual identity, creating a cohesive brand system rooted in connection.",
    tools: ["Canva", "Figma"],
    hero: { src: laManuelaCover, alt: "La Manuela rebrand identity" },
    gallery: [
      { src: laManuelaOverview, alt: "La Manuela rebrand overview" },
      { src: laManuelaVision, alt: "La Manuela brand vision" },
      { src: laManuelaMeaning, alt: "La Ronda name and meaning" },
      { src: laManuelaMoodboard, alt: "La Manuela visual moodboard" },
    ],
    layout: "landscape",
  },
];

export const projectBySlug = new Map(
  projects.map((project) => [project.slug, project]),
);
