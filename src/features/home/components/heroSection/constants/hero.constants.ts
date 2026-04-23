// ============================================================
// 🦸 HeroSection — Constants
// ============================================================
import buttonImg from "@/assets/images/button.png";
import headerImg from "@/assets/images/header.png";

export const HERO_IMAGES = {
  header: headerImg,
  button: buttonImg,
} as const;

export const HERO_LAYOUT = {
  /** Total height of the hero area (excluding safe-area inset) */
  heroHeight: 500,

  headerImage: {
    width: 300,
    height: 300,
    marginLeft: -30,
    marginTop: -80,
  },

  svgContainer: {
    left: -30,
    top: 50,
  },

  buttonContainer: {
    left: 10,
    top: 135,
  },

  buttonImage: {
    width: 160,
    height: 160,
  },
} as const;
