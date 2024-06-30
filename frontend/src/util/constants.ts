import { feature } from "./types";
import {
  IosShare,
  AutoFixHigh,
  CollectionsBookmark,
} from "@mui/icons-material";
import {
  Person4Outlined,
  SettingsOutlined,
  LogoutOutlined,
  HomeOutlined,
  TipsAndUpdatesOutlined,
  GitHub,
} from "@mui/icons-material";

export const profileSettings = [
  { title: "Profile", href: "/", Icon: Person4Outlined },
  { title: "Settings", href: "/", Icon: SettingsOutlined },
  { title: "Logout", href: "logout", Icon: LogoutOutlined },
];

export const navPages = [
  { title: "Home", href: "/", Icon: HomeOutlined },
  { title: "Features", href: "#", Icon: TipsAndUpdatesOutlined },
  {
    title: "Github",
    href: "https://github.com/yadav-abhinav/MemoirLane.git",
    Icon: GitHub,
  },
];

export const featureList: feature[] = [
  {
    title: "Photo Sharing",
    description:
      "Capture, share, and relive your favorite moments with our seamless photo sharing feature. Easily upload your photos and add captions to preserve memories.",
    Icon: IosShare,
  },
  {
    title: "Photo Editing",
    description:
      "Unleash your creativity with our powerful photo editing feature. Enhance your images with a variety of tools, including filters, cropping and more, and special effects.",
    Icon: AutoFixHigh,
  },
  {
    title: "Photo Album",
    description:
      "Organize and cherish your memories with our versatile photo album feature. Create custom albums to categorize your photos and easily navigate your collection.",
    Icon: CollectionsBookmark,
  },
];
