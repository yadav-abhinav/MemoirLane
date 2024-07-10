import { createContext } from "react";
import { JWTPayload, AuthContextType, themeContextType } from "./types";

export const authContext = createContext<AuthContextType>({
  user: {} as JWTPayload,
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const themeContext = createContext<themeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});
