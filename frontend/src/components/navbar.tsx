import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Divider,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo_black from "/logo-black.png";
import logo_white from "/logo-white.png";
import ToggleColorMode from "./toggleTheme";
import { themeTogglerProps } from "../util/types";

const pages = ["Home", "Features"];

function Navbar({ mode, toggleColorMode }: themeTogglerProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event)
    setAnchorElNav(null);
  };

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
            maxWidth: "lg",
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
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
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

          {/* Menu - SMALL */}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ color: theme.palette.text.secondary }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                onClick={handleCloseNavMenu}
                href="https://github.com/yadav-abhinav/MemoirLane"
                target="_blank"
                sx={{ color: theme.palette.text.secondary }}
              >
                Github
              </MenuItem>
              <Divider variant="middle" />
              <MenuItem disableRipple>
                <Box
                  sx={{
                    mx: "0.5rem",
                    mb: "0.5rem",
                    display: { md: "none", xs: "flex" },
                    flexDirection: "column",
                  }}
                >
                  <Button href="/signup" sx={{ borderRadius: "14px" }}>Sign Up</Button>
                  <Button href="/login" variant="contained" sx={{ borderRadius: "14px" }}>
                    Sign In
                  </Button>
                </Box>
              </MenuItem>
            </Menu>
          </Box>

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
                mr: 2,
                flexGrow: 1,
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
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: theme.palette.text.secondary,
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))}
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ mx: "0.5rem", my: "1rem" }}
            />
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: theme.palette.text.secondary,
                display: "block",
              }}
              href="https://github.com/yadav-abhinav/MemoirLane"
              target="_blank"
            >
              Github
            </Button>
          </Box>

          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

          {/* Sign up/in - MEDIUM */}
          <Box
            sx={{
              flexGrow: 0,
              mx: "1rem",
              display: { md: "flex", xs: "none" },
            }}
          >
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
