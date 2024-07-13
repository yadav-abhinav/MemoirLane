import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Box,
  BoxProps,
  ListItemIcon,
} from "@mui/material";
import { useState, MouseEvent, useContext } from "react";
import { profileSettings } from "../util/constants";
import { authContext } from "../util/context";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu(props: BoxProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorElUser(null);
    const href = event.currentTarget.dataset.href!;
    navigate(href);
  };

  return (
    <Box
      {...props}
      display="flex"
      alignItems="center"
      sx={{
        bgcolor:
          theme.palette.mode === "light"
            ? "rgba(64, 81, 78, 0.2)"
            : "rgba(64, 81, 78, 0.6)",
        borderRadius: "20px",
      }}
    >
      <IconButton
        disableTouchRipple
        onClick={handleOpenUserMenu}
        sx={{ p: 0, borderRadius: "inherit" }}
      >
        <Avatar
          src="/static/images/avatar/2.jpg"
          sx={{
            bgcolor: theme.palette.mode === "light" ? "#11999E" : "#52D3D8",
            height: "38px",
            width: "38px",
          }}
        />
        <Typography
          display={{ md: "block", xs: "none" }}
          variant="overline"
          fontWeight={500}
          color="text.primary"
          m="0.1rem 1rem 0 0.5rem"
        >
          Hello {user.email}!
        </Typography>
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {profileSettings.map((setting) => (
          <MenuItem
            data-href={setting.href}
            key={setting.title}
            onClick={handleCloseUserMenu}
          >
            <ListItemIcon>
              <setting.Icon />
            </ListItemIcon>
            <Typography textAlign="center" color="text.secondary">
              {setting.title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
