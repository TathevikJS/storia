// ============================================================
// 🧾 Profile — Type Definitions
// ============================================================

export type StoryCard = {
  id: string;
  title: string;
  date: string;
  imageUri: string;
  isFavorite?: boolean;
};

export type ProfileUser = {
  id: string;
  name: string;
  subtitle: string;
  bio: string;
  avatarUri: string;
  storiesCount: number;
  starCoins: number;
  dayStreak: number;
  dailyGiftsCount: number;
  stories: StoryCard[];
};

export type ProfileMenuItemData = {
  id: string;
  icon: string;            // emoji icon
  iconBgColor: string;
  label: string;
  description: string;
  onPress?: () => void;
};
