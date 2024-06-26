import { PaletteMode } from "@mui/material";
import React, { ReactElement } from "react";

export type themeTogglerProps = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export type authContext = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export type feature = {
  title: string;
  description: string;
  logo: ReactElement;
};
