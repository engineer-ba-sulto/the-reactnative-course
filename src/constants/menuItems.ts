import { BookOpen, FileText, Settings, User } from "lucide-react";

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
    title: "技術記事",
    url: "/articles",
    icon: FileText,
  },
  {
    title: "設定",
    url: "/dashboard/settings",
    icon: Settings,
  },
];
