// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signupForm";
import Navbar from "./components/navbar";
import Landing from "./pages/landingPage";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<PaletteMode>("light");
  const defaultTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#11999E",
      },
    }
  });

  const t = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#52D3D8"
      }
    },
  });

  defaultTheme.typography.h1 = t.typography.h1 = {
    fontSize: "2.5rem",
    [defaultTheme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
    [defaultTheme.breakpoints.up("md")]: {
      fontSize: "4rem",
    },
    [defaultTheme.breakpoints.up("lg")]: {
      fontSize: "5.9rem",
    },
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme == "light" ? defaultTheme : t}>
          <Navbar mode={theme} toggleColorMode={toggleTheme} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
