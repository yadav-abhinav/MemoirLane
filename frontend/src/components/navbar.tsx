import { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Divider,
  useTheme,
  Box,
} from "@mui/material";
import logo_black from "/logo-black.png";
import logo_white from "/logo-white.png";
import ThemeToggler from "./toggleTheme";
import { authContext } from "../util/context";
import ProfileMenu from "./profileMenu";
import { navPages } from "../util/constants";
import NavMenu from "./navMenu";

export default function Navbar() {
  const { isLoggedIn } = useContext(authContext);
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: "1rem",
            borderRadius: "30px",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          }}
        >
          {/* Logo & Name - MEDIUM */}
          <Box
            sx={{ display: { md: "flex", xs: "none" }, alignItems: "center" }}
          >
            <IconButton href="/">
              <img
                src={theme.palette.mode === "light" ? logo_black : logo_white}
                style={{ height: "35px" }}
                alt="logo"
              />
            </IconButton>
            <Typography
              variant="h6"
              fontSize="1.3rem"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: "1.5rem",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: theme.palette.mode === "light" ? "#11999E" : "#52D3D8",
                textDecoration: "none",
              }}
            >
              MEMOIRLANE
            </Typography>
          </Box>

          <NavMenu />

          {/* Logo & Name - SMALL */}
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <IconButton href="/">
              <img
                src={theme.palette.mode === "light" ? logo_black : logo_white}
                style={{ height: "35px" }}
                alt="logo"
              />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 3,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: theme.palette.mode === "light" ? "#11999E" : "#52D3D8",
                textDecoration: "none",
              }}
            >
              MEMOIRLANE
            </Typography>
          </Box>

          {/* Menu - MEDIUM */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navPages.map((page, id) => (
              <>
                {id === navPages.length - 1 && (
                  <Divider
                    key={id + 1}
                    orientation="vertical"
                    flexItem
                    sx={{ m: "0.5rem" }}
                  />
                )}
                <Button
                  // onClick={handleCloseNavMenu}
                  href={page.href}
                  sx={{
                    my: 1,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {page.title}
                </Button>
              </>
            ))}
          </Box>

          <Box display={{ md: "flex", xs: "none" }} alignItems="center">
            <ThemeToggler />
            {!isLoggedIn && (
              <Box mx="1rem">
                <Button href="/signUp" sx={{ borderRadius: "14px" }}>
                  Sign Up
                </Button>
                <Button
                  href="/login"
                  variant="contained"
                  sx={{ borderRadius: "14px", ml: "0.5rem" }}
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Box>

          {isLoggedIn ? (
            <ProfileMenu ml={{ xs: 0, md: "2rem" }} />
          ) : (
            <ThemeToggler sx={{ display: { md: "none", xs: "flex" } }} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
