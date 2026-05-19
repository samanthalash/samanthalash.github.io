import paperclipImage from "../assets/paperclip.png";
import monogramImage from "../assets/monogram.png";
import postcardImage from "../assets/postcard.png";
import libraryCardImage from "../assets/library-card.png";
import conceptStampImage from "../assets/creative-direction/concept.png";
import planningStampImage from "../assets/creative-direction/planning.png";
import stylingStampImage from "../assets/creative-direction/styling.png";
import photoStampImage from "../assets/creative-direction/photo.png";
import copyWritingStampImage from "../assets/creative-direction/copy-writing.png";
import graphicDesignStampImage from "../assets/creative-direction/graphic-design.png";
import nylonPhotoImage from "../assets/creative-direction/nylon_photo.png";
import leviCyclistImage from "../assets/creative-direction/levi-cyclist.png";
import leviBillboardImage from "../assets/creative-direction/levi-billboard.png";
import leviDesertImage from "../assets/creative-direction/levi-desert.png";
import leviBeachImage from "../assets/creative-direction/levi-beach.png";
import hunterFlatlayImage from "../assets/brand-identity/hunter-flatlay.png";
import hunterBillboardImage from "../assets/brand-identity/hunter-billboard.png";
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
import aprampCoverImage from "../../inspo/apramp/ap1.png";
import aprampIntroImage from "../../inspo/apramp/ap2.png";
import aprampGiftBoxImage from "../../inspo/apramp/ap3.png";
import aprampInsideBoxImage from "../../inspo/apramp/ap4.png";
import aprampExecutionPlanImage from "../../inspo/apramp/ap5.png";
import tomorrowlandPosterImage from "../../inspo/tomorrowland /1st.png";
import tomorrowlandInstagramImage from "../../inspo/tomorrowland /2nd.png";
import tomorrowlandVinylImage from "../../inspo/tomorrowland /3rd.png";
import tomorrowlandSteviePosterImage from "../../inspo/tomorrowland /4th.png";

export const layoutAssetRegistry = {
  paperclip: paperclipImage,
  monogram: monogramImage,
  postcard: postcardImage,
  "library-card": libraryCardImage,
  "stamp-concept": conceptStampImage,
  "stamp-planning": planningStampImage,
  "stamp-styling": stylingStampImage,
  "stamp-photo": photoStampImage,
  "stamp-copy-writing": copyWritingStampImage,
  "stamp-graphic-design": graphicDesignStampImage,
  "stamp-strategy": laManuelaStrategyStampImage,
  "stamp-pitch-deck": laManuelaPitchDeckStampImage,
  "creative-nylon-photo": nylonPhotoImage,
  "creative-levi-cyclist": leviCyclistImage,
  "creative-levi-billboard": leviBillboardImage,
  "creative-levi-desert": leviDesertImage,
  "creative-levi-beach": leviBeachImage,
  "brand-hunter-flatlay": hunterFlatlayImage,
  "brand-hunter-billboard": hunterBillboardImage,
  "la-manuela-cover": laManuelaCoverImage,
  "la-manuela-vision": laManuelaVisionImage,
  "la-manuela-meaning": laManuelaMeaningImage,
  "la-manuela-moodboard": laManuelaMoodboardImage,
  "spotify-cover": spotifyCoverImage,
  "spotify-concept": spotifyConceptImage,
  "spotify-content-ideas": spotifyContentIdeasImage,
  "spotify-moodboard": spotifyMoodboardImage,
  "apramp-cover": aprampCoverImage,
  "apramp-intro": aprampIntroImage,
  "apramp-gift-box": aprampGiftBoxImage,
  "apramp-inside-box": aprampInsideBoxImage,
  "apramp-execution-plan": aprampExecutionPlanImage,
  "tomorrowland-poster": tomorrowlandPosterImage,
  "tomorrowland-instagram": tomorrowlandInstagramImage,
  "tomorrowland-vinyl": tomorrowlandVinylImage,
  "tomorrowland-stevie-poster": tomorrowlandSteviePosterImage,
} as const;

export type LayoutAssetId = keyof typeof layoutAssetRegistry;

export const resolveLayoutAsset = (assetId?: string, src?: string) => {
  if (src) {
    return src;
  }

  if (!assetId) {
    return undefined;
  }

  return layoutAssetRegistry[assetId as LayoutAssetId];
};
