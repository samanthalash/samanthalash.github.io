import hunterBillboardImage from "../assets/brand-identity/hunter-billboard.png";
import hunterFlatlayImage from "../assets/brand-identity/hunter-flatlay.png";
import leviBeachImage from "../assets/creative-direction/levi-beach.png";
import leviBillboardImage from "../assets/creative-direction/levi-billboard.png";
import leviCyclistImage from "../assets/creative-direction/levi-cyclist.png";
import leviDesertImage from "../assets/creative-direction/levi-desert.png";
import nylonPhotoImage from "../assets/creative-direction/nylon_photo.png";
import aprampOverviewImage from "../../inspo/Apramp.png";
import laManuelaOverviewImage from "../../inspo/La_manuela.png";
import tomorrowlandOverviewImage from "../../inspo/Tomorrowland.png";
import levisInspoCyclistImage from "../../inspo/levi's/Screenshot 2026-04-01 at 2.10.29 PM.png";
import levisInspoBillboardImage from "../../inspo/levi's/Screenshot 2026-04-01 at 2.23.13 PM.png";
import levisInspoDesertImage from "../../inspo/levi's/Screenshot 2026-04-09 at 3.21.20 PM.png";
import levisInspoBeachImage from "../../inspo/levi's/Screenshot 2026-04-09 at 3.21.46 PM.png";
import type { PortfolioGalleryImage } from "./portfolioGallery";

export type ProjectGalleryId =
  | "levis-campaign"
  | "hunter-campaign"
  | "nylon-editorial"
  | "tomorrowland-rebrand"
  | "la-manuela"
  | "apramp-campaign";

export interface ProjectGallery {
  title: string;
  images: PortfolioGalleryImage[];
}

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

const getFilename = (path: string) => {
  const parts = path.split("/");
  const filename = parts[parts.length - 1] ?? path;
  return filename.replace(/\.[^.]+$/, "");
};

const imagesFromGlob = (
  imagesByPath: Record<string, string>,
  duplicateKeysByPath: Record<string, string> = {},
) =>
  Object.entries(imagesByPath)
    .sort(([firstPath], [secondPath]) =>
      collator.compare(getFilename(firstPath), getFilename(secondPath)),
    )
    .map(([path, src]) => ({
      id: path,
      src,
      alt: getFilename(path).replace(/[_-]+/g, " "),
      dedupeKey: duplicateKeysByPath[path],
    }));

const dedupeImages = (images: PortfolioGalleryImage[]) =>
  images.filter((image, index, allImages) => {
    const imageKey = image.dedupeKey ?? image.src;
    return (
      allImages.findIndex(
        (candidate) => (candidate.dedupeKey ?? candidate.src) === imageKey,
      ) === index
    );
  });

const levisInspoImages: PortfolioGalleryImage[] = [
  {
    id: "project-levis-inspo-cyclist",
    src: levisInspoCyclistImage,
    alt: "Levi's campaign cyclist",
    dedupeKey: "levis-cyclist",
  },
  {
    id: "project-levis-inspo-billboard",
    src: levisInspoBillboardImage,
    alt: "Levi's campaign billboard",
    dedupeKey: "levis-billboard",
  },
  {
    id: "project-levis-inspo-desert",
    src: levisInspoDesertImage,
    alt: "Levi's campaign desert",
    dedupeKey: "levis-desert",
  },
  {
    id: "project-levis-inspo-beach",
    src: levisInspoBeachImage,
    alt: "Levi's campaign beach",
    dedupeKey: "levis-beach",
  },
];

const hunterInspoImages = imagesFromGlob(
  import.meta.glob<string>("../../inspo/hunter/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  {
    "../../inspo/hunter/Screenshot 2026-03-19 at 1.01.51 PM.png":
      "hunter-flatlay",
    "../../inspo/hunter/Screenshot 2026-04-01 at 2.02.30 PM.png":
      "hunter-billboard",
  },
);

const nylonInspoImages = imagesFromGlob(
  import.meta.glob<string>("../../inspo/nylon/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  {
    "../../inspo/nylon/editorial-article-draft-1.png":
      "nylon-editorial-desktop",
  },
);

const tomorrowlandInspoImages = imagesFromGlob(
  import.meta.glob<string>("../../inspo/tomorrowland /*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
);

const laManuelaInspoImages = imagesFromGlob(
  import.meta.glob<string>("../../inspo/la manuela/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
);

const aprampInspoImages = imagesFromGlob(
  import.meta.glob<string>("../../inspo/apramp/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
);

export const projectGalleries: Record<ProjectGalleryId, ProjectGallery> = {
  "levis-campaign": {
    title: "Levi's Campaign",
    images: dedupeImages([
      {
        id: "project-levis-billboard",
        src: leviBillboardImage,
        alt: "Levi's campaign billboard",
        dedupeKey: "levis-billboard",
      },
      {
        id: "project-levis-cyclist",
        src: leviCyclistImage,
        alt: "Levi's campaign cyclist",
        dedupeKey: "levis-cyclist",
      },
      {
        id: "project-levis-beach",
        src: leviBeachImage,
        alt: "Levi's campaign beach",
        dedupeKey: "levis-beach",
      },
      {
        id: "project-levis-desert",
        src: leviDesertImage,
        alt: "Levi's campaign desert",
        dedupeKey: "levis-desert",
      },
      ...levisInspoImages,
    ]),
  },
  "hunter-campaign": {
    title: "Hunter Campaign",
    images: dedupeImages([
      {
        id: "project-hunter-billboard",
        src: hunterBillboardImage,
        alt: "Hunter campaign billboard",
        dedupeKey: "hunter-billboard",
      },
      {
        id: "project-hunter-flatlay",
        src: hunterFlatlayImage,
        alt: "Hunter campaign flatlay",
        dedupeKey: "hunter-flatlay",
      },
      ...hunterInspoImages,
    ]),
  },
  "nylon-editorial": {
    title: "Nylon Editorial",
    images: dedupeImages([
      {
        id: "project-nylon-photo",
        src: nylonPhotoImage,
        alt: "Nylon editorial visual",
        dedupeKey: "nylon-editorial-desktop",
      },
      ...nylonInspoImages,
    ]),
  },
  "tomorrowland-rebrand": {
    title: "Tomorrowland Rebrand",
    images: dedupeImages([
      {
        id: "project-tomorrowland-overview",
        src: tomorrowlandOverviewImage,
        alt: "Tomorrowland rebrand overview",
      },
      ...tomorrowlandInspoImages,
    ]),
  },
  "la-manuela": {
    title: "La Manuela",
    images: dedupeImages([
      {
        id: "project-la-manuela-overview",
        src: laManuelaOverviewImage,
        alt: "La Manuela overview",
      },
      ...laManuelaInspoImages,
    ]),
  },
  "apramp-campaign": {
    title: "APRAMP Campaign",
    images: dedupeImages([
      {
        id: "project-apramp-overview",
        src: aprampOverviewImage,
        alt: "APRAMP campaign overview",
      },
      ...aprampInspoImages,
    ]),
  },
};
