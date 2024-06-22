// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signupForm";
import Navbar from "./components/navbar";
import Landing from "./pages/landingPage";
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import Login from "./components/loginForm";

function App() {
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem("mode") ?? "light") as PaletteMode
  );
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#11999E",
      },
    },
  });

  const darkTheme = createTheme({
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

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <Navbar mode={mode} toggleColorMode={toggleTheme} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
