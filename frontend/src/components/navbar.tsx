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
  styled,
  useMediaQuery,
} from "@mui/material";
import logo_black from "/logo-black.png";
import logo_white from "/logo-white.png";
import ThemeToggler from "./toggleTheme";
import { authContext } from "../util/context";
import ProfileMenu from "./profileMenu";
import { navPages } from "../util/constants";
import NavMenu from "./navMenu";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 1rem",
  borderRadius: "30px",
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(12px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  boxShadow:
    theme.palette.mode === "light"
      ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
      : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: theme.palette.primary.main,
  textDecoration: "none",
})) as typeof Typography;

export default function Navbar() {
  const theme = useTheme();
  const { isLoggedIn } = useContext(authContext);
  const matches = useMediaQuery("(min-width:400px)");

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "transparent",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar disableGutters>
          {/* Logo & Name - MEDIUM */}
          <Box
            sx={{ display: { md: "flex", xs: "none" }, alignItems: "center" }}
          >
            <IconButton href="/">
              <img
                src={theme.palette.mode === "light" ? logo_black : logo_white}
                height="35px"
              />
            </IconButton>
            <LogoText
              variant="h6"
              component="a"
              fontSize="1.3rem"
              href="/"
              hidden={!matches}
              children={"MEMOIRLANE"}
            />
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
            <LogoText
              variant="h6"
              component="a"
              href="/"
              hidden={!matches}
              children={"MEMOIRLANE"}
            />
          </Box>

          {/* Menu - MEDIUM */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navPages.map((page, id) => (
              <>
                {id === navPages.length - 1 && (
                  <Divider
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
                  children={page.title}
                />
              </>
            ))}
          </Box>

          <ProfileMenu display={{ md: "none", xs: "flex" }} ml="1.5rem" />

          <Box display={{ md: "flex", xs: "none" }} alignItems="center">
            <ThemeToggler />
            {isLoggedIn ? (
              <ProfileMenu ml="2rem" />
            ) : (
              <Box mx="1rem">
                <Button
                  href="/signUp"
                  sx={{ borderRadius: "14px" }}
                  children={"Sign Up"}
                />
                <Button
                  href="/login"
                  variant="contained"
                  sx={{ borderRadius: "14px", ml: "0.5rem" }}
                  children={"Sign In"}
                />
              </Box>
            )}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
