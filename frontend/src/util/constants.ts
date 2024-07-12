import { Feature } from "./types";
import {
  Link,
  IosShare,
  AutoFixHigh,
  CollectionsBookmark,
  FavoriteBorder,
  CollectionsOutlined,
  AddPhotoAlternateOutlined,
} from "@mui/icons-material";
import {
  PeopleOutlined,
  PhotoOutlined,
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

export const FeatureList: Feature[] = [
  {
    title: "Photo Sharing",
    description:
      "Capture, share, and relive your favorite moments with our seamless photo sharing Feature. Easily upload your photos and add captions to preserve memories.",
    Icon: IosShare,
  },
  {
    title: "Photo Editing",
    description:
      "Unleash your creativity with our powerful photo editing Feature. Enhance your images with a variety of tools, including filters, cropping and more, and special effects.",
    Icon: AutoFixHigh,
  },
  {
    title: "Photo Album",
    description:
      "Organize and cherish your memories with our versatile photo album Feature. Create custom albums to categorize your photos and easily navigate your collection.",
    Icon: CollectionsBookmark,
  },
];

export const dashPanelMenuList = [
  { title: "Photos", href: "/", Icon: PhotoOutlined },
  { title: "Shared", href: "#", Icon: PeopleOutlined },
  { title: "Favourites", href: "/", Icon: FavoriteBorder },
  { title: "Albums", href: "#", Icon: CollectionsOutlined },
];

export const uploadActions = [
  { title: "Local Device", href: "/", Icon: AddPhotoAlternateOutlined },
  { title: "Image link", href: "/", Icon: Link },
  { title: "Album", href: "#", Icon: CollectionsOutlined },
];

export const imageGridDimensions = [
  [2, 2],
  [2, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [1, 2],
  [1, 1],
  [1, 2],
  [1, 2],
  [1, 1],
  [2, 1],
  [1, 2],
  [2, 1],
  [2, 2],
  [1, 1],
  [1, 1],
  [2, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 2],
  [1, 1],
];

export const IMAGE_BASE_WIDTH = 128;
