import { Bounce, ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, useTheme } from "@mui/material";
import SignUp from "./pages/signupPage";
import Navbar from "./components/nav/navbar";
import Landing from "./pages/landingPage";
import Login from "./pages/loginPage";
import AuthRoute from "./components/router/authRoute";
import PrivateRoute from "./components/router/privateRoute";
import Dashboard from "./pages/dashboard";
import { AuthProvider } from "./components/provider/authProvider";
import Logout from "./components/logout";

function App() {
  const theme = useTheme();

  return (
    <BrowserRouter>
      <CssBaseline />
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/explore" element={<Landing />} />
          <Route path="/signup" element={<AuthRoute element={<SignUp />} />} />
          <Route path="/login" element={<AuthRoute element={<Login />} />} />
          <Route
            path="/logout"
            element={<PrivateRoute element={<Logout />} />}
          />
          <Route path="/*" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme={theme.palette.mode}
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App;
