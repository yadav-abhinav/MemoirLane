import { createContext } from "react";
import { authContext } from "./types";

export const AuthContext = createContext<authContext>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});
