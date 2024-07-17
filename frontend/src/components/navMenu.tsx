import {
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Box,
  useTheme,
  ListItemIcon,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { navPages } from "../util/constants";
import ThemeToggler from "./toggleTheme";
import { Link } from "react-router-dom";

export default function NavMenu() {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        onClick={handleOpenNavMenu}
        children={<MenuIcon />}
      />
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
            <ListItemIcon children={<page.Icon />} />
            <Typography textAlign="center" children={page.title} />
          </MenuItem>
        ))}
        <Divider variant="middle" />
        <Box
          display="flex"
          justifyContent="center"
          my="1rem"
          sx={{ color: "green" }}
          children={<ThemeToggler />}
        />
      </Menu>
    </Box>
  );
}
