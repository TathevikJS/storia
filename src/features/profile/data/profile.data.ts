// ============================================================
// 📦 Profile — Mock Data
// ============================================================

import type { ProfileMenuItemData, ProfileUser } from "../types/profile.types";

export const MOCK_USER: ProfileUser = {
  id: "1",
  name: "Luna",
  subtitle: "Young storyteller",
  bio: "I love adventures, magic\nand meeting new friends! ⭐",
  avatarUri: "https://i.pravatar.cc/200?img=47", // placeholder
  storiesCount: 12,
  starCoins: 340,
  dayStreak: 7,
  dailyGiftsCount: 3,
  stories: [
    {
      id: "s1",
      title: "The Floating Castle",
      date: "May 20, 2024",
      imageUri:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200",
      isFavorite: true,
    },
    {
      id: "s2",
      title: "Space Adventure",
      date: "May 18, 2024",
      imageUri:
        "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200",
      isFavorite: true,
    },
    {
      id: "s3",
      title: "My Dragon Friend",
      date: "May 15, 2024",
      imageUri:
        "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=200",
      isFavorite: true,
    },
  ],
};

export const PROFILE_MENU_ITEMS: ProfileMenuItemData[] = [
  {
    id: "free_coins",
    icon: "🎁",
    iconBgColor: "#7C3AED",
    label: "Get Free Star Coins",
    description: "Complete offers and watch videos",
  },
  {
    id: "favorites",
    icon: "❤️",
    iconBgColor: "#EF4444",
    label: "Favorites",
    description: "Your favorite stories and characters",
  },
  {
    id: "settings",
    icon: "⚙️",
    iconBgColor: "#64748B",
    label: "Settings",
    description: "Account, sounds and more",
  },
];
