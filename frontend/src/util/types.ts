import { PaletteMode } from "@mui/material";
import { ReactElement } from "react";

export type themeTogglerProps = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export type feature = {
  title: string;
  description: string;
  logo: ReactElement;
};
