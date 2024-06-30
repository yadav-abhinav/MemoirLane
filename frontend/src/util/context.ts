import { createContext } from "react";
import { CustomJWTPayload, authContextType, themeContextType } from "./types";

export const authContext = createContext<authContextType>({
  user: {} as CustomJWTPayload,
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const themeContext = createContext<themeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});
