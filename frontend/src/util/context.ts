import { createContext } from "react";
import {
  JWTPayload,
  AuthContextType,
  ThemeContextType,
  MediaContextType,
  Media,
} from "./types";

export const authContext = createContext<AuthContextType>({
  user: {} as JWTPayload,
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const themeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

export const mediaContext = createContext<MediaContextType>({
  media: {} as Media,
  fetchImageData: async () => {},
});
