import { ImageSourcePropType } from "react-native";

export type MagicCard = {
  id: string;
  label: string;
  description: string;
  gradient: readonly [string, string, string];
  illustrationGradient: readonly [string, string];
  borderGradient: readonly [string, string, string];
  arrowBg: string;
  descriptionColor: string;
  image: ImageSourcePropType;
};
