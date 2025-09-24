import { BookOpen, Settings, User } from "lucide-react";

// メニューデータ
export const menuItems = [
  {
    title: "アカウント",
    url: "/dashboard",
    icon: User,
  },
  {
    title: "コース",
    url: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "設定",
    url: "/dashboard/settings",
    icon: Settings,
  },
];
