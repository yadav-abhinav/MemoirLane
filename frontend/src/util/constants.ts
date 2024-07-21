import * as Icon from "@mui/icons-material";
import { Slide, ToastOptions, ToastPromiseParams } from "react-toastify";
import { Feature } from "./types";

export const profileSettings = [
  { title: "Profile", href: "/", Icon: Icon.Person4Outlined },
  { title: "Settings", href: "/", Icon: Icon.SettingsOutlined },
  { title: "Logout", href: "/logout", Icon: Icon.LogoutOutlined },
];

export const navPages = [
  { title: "Home", href: "/", Icon: Icon.HomeOutlined },
  { title: "Features", href: "#", Icon: Icon.TipsAndUpdatesOutlined },
  {
    title: "Github",
    href: "https://github.com/yadav-abhinav/MemoirLane.git",
    Icon: Icon.GitHub,
  },
];

export const FeatureList: Feature[] = [
  {
    title: "Photo Sharing",
    description:
      "Capture, share, and relive your favorite moments with our seamless photo sharing Feature. Easily upload your photos and add captions to preserve memories.",
    Icon: Icon.IosShare,
  },
  {
    title: "Photo Editing",
    description:
      "Unleash your creativity with our powerful photo editing Feature. Enhance your images with a variety of tools, including filters, cropping and more, and special effects.",
    Icon: Icon.AutoFixHigh,
  },
  {
    title: "Photo Album",
    description:
      "Organize and cherish your memories with our versatile photo album Feature. Create custom albums to categorize your photos and easily navigate your collection.",
    Icon: Icon.CollectionsBookmark,
  },
];

export const dashPanelMenuList = [
  { title: "Photos", href: "/", Icon: Icon.PhotoOutlined },
  { title: "Shared", href: "/sharing", Icon: Icon.PeopleOutlined },
  { title: "Favourites", href: "/", Icon: Icon.FavoriteBorder },
  { title: "Albums", href: "#", Icon: Icon.CollectionsOutlined },
];

export const uploadActions = [
  {
    id: "local",
    title: "Local device",
    Icon: Icon.AddPhotoAlternateOutlined,
  },
  { id: "link", title: "Image link", Icon: Icon.Link },
  { id: "album", title: "Album", Icon: Icon.CollectionsOutlined },
];

export const mediaOptions = (favourite: boolean) => [
  {
    id: "favourite",
    title: "Favourite",
    Icon: favourite ? Icon.Star : Icon.StarBorder,
  },
  { id: "share", title: "Share", Icon: Icon.Share },
  { id: "details", title: "Details", Icon: Icon.Info },
  { id: "delete", title: "Delete", Icon: Icon.Delete },
  { id: "download", title: "Download", Icon: Icon.Download },
  { id: "album", title: "Add to Album", Icon: Icon.CollectionsOutlined },
];

export const sharingTableHeaders = [
  "Shared Albums",
  "",
  "Owner",
  "Last Activity",
  "",
];

export const albumOptions = [
  {
    id: "leave",
    title: "Leave album",
  },
  {
    id: "delete",
    title: "Delete album",
  },
];

export const toastOptions = (
  itemSize: number = 1,
  operation = "Upload"
): [ToastPromiseParams, ToastOptions] => {
  return [
    {
      pending: `${operation}ing ${itemSize} item(s)`,
      success: `Image(s) ${operation}ed successfully`,
      error: `Error ${operation}ing image(s)`,
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
