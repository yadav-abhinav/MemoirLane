import { Feature } from "./types";
import {
  Link,
  IosShare,
  AutoFixHigh,
  CollectionsBookmark,
  FavoriteBorder,
  CollectionsOutlined,
  AddPhotoAlternateOutlined,
  Share,
  Info,
  Star,
  StarBorder,
  Delete,
  MoreHoriz,
  Download,
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
import { Slide, ToastOptions, ToastPromiseParams } from "react-toastify";

export const profileSettings = [
  { title: "Profile", href: "/", Icon: Person4Outlined },
  { title: "Settings", href: "/", Icon: SettingsOutlined },
  { title: "Logout", href: "/logout", Icon: LogoutOutlined },
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
  {
    id: "local",
    title: "Local device",
    Icon: AddPhotoAlternateOutlined,
  },
  { id: "link", title: "Image link", Icon: Link },
  { id: "album", title: "Album", Icon: CollectionsOutlined },
];

export const mediaOptions = (favourite: boolean) => [
  { title: "Share", Icon: Share },
  { title: "Details", Icon: Info },
  { title: "Favourite", Icon: favourite ? Star : StarBorder },
  { title: "Delete", Icon: Delete },
  { title: "Options", Icon: MoreHoriz },
];

export const mediaMoreOptions = [
  { id: "download", title: "Download", Icon: Download },
  { id: "album", title: "Add to Album", Icon: CollectionsOutlined },
];

export const toastOptions = (
  itemSize: number
): [ToastPromiseParams, ToastOptions] => {
  return [
    {
      pending: `Uploading ${itemSize} item(s)`,
      success: "Image(s) uploaded successfully",
      error: "Error uploading image(s)",
    },
    { position: "bottom-left", transition: Slide },
  ];
};

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
