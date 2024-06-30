import {
  IconButton,
  Typography,
  Menu,
  Button,
  MenuItem,
  Divider,
  Box,
  useTheme,
  ListItemIcon,
} from "@mui/material";
import { useContext, useState, MouseEvent } from "react";
import { authContext } from "../util/context";
import { Menu as MenuIcon } from "@mui/icons-material";
import { navPages } from "../util/constants";
import ThemeToggler from "./toggleTheme";
import { Link } from "react-router-dom";

export default function NavMenu() {
  const theme = useTheme();
  const { isLoggedIn } = useContext(authContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
      <IconButton size="large" onClick={handleOpenNavMenu}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="nav-menu"
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
        {navPages.map((page, id) => (
          <MenuItem
            key={id}
            component={Link}
            to={page.href}
            onClick={handleCloseNavMenu}
            sx={{ color: theme.palette.text.secondary }}
          >
            <ListItemIcon>
              <page.Icon />
            </ListItemIcon>
            <Typography textAlign="center">{page.title}</Typography>
          </MenuItem>
        ))}
        <Divider variant="middle" />
        {isLoggedIn ? (
          <Box
            display="flex"
            justifyContent="center"
            my="1rem"
            sx={{ color: "green" }}
          >
            <ThemeToggler />
          </Box>
        ) : (
          <MenuItem disableRipple>
            <Box
              sx={{
                mx: "0.5rem",
                mb: "0.5rem",
                display: { md: "none", xs: "flex" },
                flexDirection: "column",
              }}
            >
              <Button href="/signup" sx={{ borderRadius: "14px" }}>
                Sign Up
              </Button>
              <Button
                href="/login"
                variant="contained"
                sx={{ borderRadius: "14px" }}
              >
                Sign In
              </Button>
            </Box>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
