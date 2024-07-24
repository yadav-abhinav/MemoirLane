import { createTheme } from "@mui/material";

const typography = {
  fontFamily: `"Raleway", "Roboto", "Helvetica Neue", "Arial", sans-serif`,
  fontWeightLight: 300,
  fontWeightRegular: 500,
  fontWeightMedium: 600,
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#11999E",
    },
  },
  typography,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#52D3D8",
    },
  },
  typography,
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
