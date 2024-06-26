import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signupForm";
import Navbar from "./components/navbar";
import Landing from "./pages/landingPage";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Login from "./components/loginForm";
import { lightTheme, darkTheme } from "./util/theme";
import AuthRoute from "./components/authRoute";
import PrivateRoute from "./components/privateRoute";
import Dashboard from "./pages/dashboard";
import { AuthContext } from "./util/context";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift();
}

function App() {
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem("mode") ?? "light") as PaletteMode
  );

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie("token");
    console.log(token);
    console.log(document.cookie);
  }, [isLoggedIn]);

  const toggleTheme = (): void => {
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
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
          <Navbar mode={mode} toggleColorMode={toggleTheme} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/signup"
              element={<AuthRoute element={<SignUp />} />}
            />
            <Route path="/login" element={<AuthRoute element={<Login />} />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
          </Routes>
        </AuthContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
