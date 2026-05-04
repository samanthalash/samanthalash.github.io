import hunterBillboardImage from "../assets/brand-identity/hunter-billboard.png";
import hunterFlatlayImage from "../assets/brand-identity/hunter-flatlay.png";
import leviBeachImage from "../assets/creative-direction/levi-beach.png";
import leviBillboardImage from "../assets/creative-direction/levi-billboard.png";
import leviCyclistImage from "../assets/creative-direction/levi-cyclist.png";
import leviDesertImage from "../assets/creative-direction/levi-desert.png";
import nylonPhotoImage from "../assets/creative-direction/nylon_photo.png";
import levisInspoCyclistImage from "../../inspo/levi's/Screenshot 2026-04-01 at 2.10.29 PM.png";
import levisInspoBillboardImage from "../../inspo/levi's/Screenshot 2026-04-01 at 2.23.13 PM.png";
import levisInspoDesertImage from "../../inspo/levi's/Screenshot 2026-04-09 at 3.21.20 PM.png";
import levisInspoBeachImage from "../../inspo/levi's/Screenshot 2026-04-09 at 3.21.46 PM.png";

export interface PortfolioGalleryImage {
  id: string;
  src: string;
  alt: string;
  dedupeKey?: string;
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

const spotifyInspoImages = imagesFromGlob(
  import.meta.glob<string>("../../inspo/spotify/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
);

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
);

const tomorrowlandInspoImages = imagesFromGlob(
  import.meta.glob<string>("../../inspo/tomorrowland /*.{png,jpg,jpeg,webp}", {
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

const laManuelaInspoImages = imagesFromGlob(
  import.meta.glob<string>("../../inspo/la manuela/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
);

const orderedPortfolioGalleryImages: PortfolioGalleryImage[] = [
  {
    id: "portfolio-levis-billboard",
    src: leviBillboardImage,
    alt: "Levi's campaign billboard",
    dedupeKey: "levis-billboard",
  },
  {
    id: "portfolio-levis-cyclist",
    src: leviCyclistImage,
    alt: "Levi's campaign cyclist",
    dedupeKey: "levis-cyclist",
  },
  {
    id: "portfolio-levis-beach",
    src: leviBeachImage,
    alt: "Levi's campaign beach",
    dedupeKey: "levis-beach",
  },
  {
    id: "portfolio-levis-desert",
    src: leviDesertImage,
    alt: "Levi's campaign desert",
    dedupeKey: "levis-desert",
  },
  {
    id: "inspo-levis-cyclist",
    src: levisInspoCyclistImage,
    alt: "Levi's campaign cyclist",
    dedupeKey: "levis-cyclist",
  },
  {
    id: "inspo-levis-billboard",
    src: levisInspoBillboardImage,
    alt: "Levi's campaign billboard",
    dedupeKey: "levis-billboard",
  },
  {
    id: "inspo-levis-desert",
    src: levisInspoDesertImage,
    alt: "Levi's campaign desert",
    dedupeKey: "levis-desert",
  },
  {
    id: "inspo-levis-beach",
    src: levisInspoBeachImage,
    alt: "Levi's campaign beach",
    dedupeKey: "levis-beach",
  },
  ...spotifyInspoImages,
  {
    id: "portfolio-hunter-billboard",
    src: hunterBillboardImage,
    alt: "Hunter campaign billboard",
    dedupeKey: "hunter-billboard",
  },
  {
    id: "portfolio-hunter-flatlay",
    src: hunterFlatlayImage,
    alt: "Hunter campaign flatlay",
    dedupeKey: "hunter-flatlay",
  },
  ...hunterInspoImages,
  {
    id: "portfolio-nylon-photo",
    src: nylonPhotoImage,
    alt: "Nylon editorial visual",
  },
  ...nylonInspoImages,
  ...tomorrowlandInspoImages,
  ...aprampInspoImages,
  ...laManuelaInspoImages,
];

export const portfolioGalleryImages: PortfolioGalleryImage[] =
  orderedPortfolioGalleryImages.filter((image, index, images) => {
    const imageKey = image.dedupeKey ?? image.src;
    const firstMatchingImageIndex = images.findIndex(
      (candidate) => (candidate.dedupeKey ?? candidate.src) === imageKey,
    );

    return firstMatchingImageIndex === index;
  });
