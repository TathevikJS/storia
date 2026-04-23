import cardAdventureImg from "@/assets/images/card_adventure.png";
import cardDrawImg from "@/assets/images/card_draw.png";
import cardStoriesImg from "@/assets/images/card_stories.png";
import { Colors } from "@/src/theme/colors";
import type { MagicCard } from "../types/magic-start.types";

/** Card ids — used as keys into the translation `cards` map */
export type CardId = "draw" | "adventure" | "stories";

export const MAGIC_CARDS: readonly MagicCard[] = [
  {
    id: "draw" satisfies CardId,
    gradient: Colors.cardGradient.draw.main,
    illustrationGradient: Colors.cardGradient.draw.illustration,
    borderGradient: Colors.cardGradient.draw.border,
    arrowBg: Colors.cardGradient.draw.arrow,
    descriptionColor: "#C8E0FF",
    image: cardDrawImg,
    label: "",
    description: "",
  },
  {
    id: "adventure" satisfies CardId,
    gradient: Colors.cardGradient.adventure.main,
    illustrationGradient: Colors.cardGradient.adventure.illustration,
    borderGradient: Colors.cardGradient.adventure.border,
    arrowBg: Colors.cardGradient.adventure.arrow,
    descriptionColor: "#D4AAFF",
    image: cardAdventureImg,
    label: "",
    description: "",
  },
  {
    id: "stories" satisfies CardId,
    gradient: Colors.cardGradient.stories.main,
    illustrationGradient: Colors.cardGradient.stories.illustration,
    borderGradient: Colors.cardGradient.stories.border,
    arrowBg: Colors.cardGradient.stories.arrow,
    descriptionColor: "#A8EED4",
    image: cardStoriesImg,
    label: "",
    description: "",
  },
] as const;
