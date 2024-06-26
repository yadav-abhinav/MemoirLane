import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#11999E",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#52D3D8",
    },
  },
});

lightTheme.typography.h1 = darkTheme.typography.h1 = {
  fontSize: "2.5rem",
  [lightTheme.breakpoints.up("sm")]: {
    fontSize: "3rem",
  },
  [lightTheme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
  [lightTheme.breakpoints.up("lg")]: {
    fontSize: "5.9rem",
  },
};