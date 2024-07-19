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
  styled,
  Button,
} from "@mui/material";
import { useState, MouseEvent, useContext } from "react";
import { profileSettings } from "../../util/constants";
import { authContext } from "../../util/context";
import { useNavigate } from "react-router-dom";
import { Face, Login } from "@mui/icons-material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(64, 81, 78, 0.2)"
      : "rgba(64, 81, 78, 0.6)",
  borderRadius: "20px",
}));

export default function ProfileMenu(props: BoxProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(authContext);
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
    <StyledBox {...props}>
      <IconButton
        disableTouchRipple
        onClick={handleOpenUserMenu}
        sx={{ p: 0, borderRadius: "inherit" }}
      >
        <Avatar
          src="/static/images/avatar/2.jpg"
          sx={{
            bgcolor: theme.palette.primary.main,
            height: "38px",
            width: "38px",
          }}
          children={isLoggedIn ? <Face /> : <Login />}
        />
        <Typography
          display={{ md: "block", xs: "none" }}
          variant="overline"
          fontWeight={500}
          color="text.primary"
          m="0.1rem 1rem 0 0.5rem"
          children={`Hello ${user.name.split(" ")[0]}!`}
        />
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
        {isLoggedIn ? (
          profileSettings.map((setting) => (
            <MenuItem
              data-href={setting.href}
              key={setting.title}
              onClick={handleCloseUserMenu}
            >
              <ListItemIcon children={<setting.Icon />} />
              <Typography
                textAlign="center"
                color="text.secondary"
                children={setting.title}
              />
            </MenuItem>
          ))
        ) : (
          <MenuItem disableRipple>
            <Box mb="0.5rem" display="flex" flexDirection="column">
              <Button
                href="/signup"
                sx={{ borderRadius: "14px" }}
                children={"Sign Up"}
              />
              <Button
                href="/login"
                variant="contained"
                sx={{ borderRadius: "14px" }}
                children={"Sign In"}
              />
            </Box>
          </MenuItem>
        )}
      </Menu>
    </StyledBox>
  );
}
