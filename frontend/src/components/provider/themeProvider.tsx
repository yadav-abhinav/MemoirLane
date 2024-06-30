import { PaletteMode, ThemeProvider } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { lightTheme, darkTheme } from "../../util/theme";
import { themeContext } from "../../util/context";

export function CustomThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem("mode") ?? "light") as PaletteMode
  );

  const toggleColorMode = (): void => {
    setMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <themeContext.Provider value={{ mode, toggleColorMode }}>
        {children}
      </themeContext.Provider>
    </ThemeProvider>
  );
}
