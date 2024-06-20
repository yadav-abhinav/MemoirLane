import { Container, useTheme } from "@mui/material";
import Features from "../components/features";
import Hero from "../components/hero";

function LandingPage() {
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "light"
      ? "rgba(17, 153, 158, 0.2)"
      : "rgba(38, 80, 115, 0.2)";

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        background: `linear-gradient(90deg, ${bgColor}, transparent 40%), linear-gradient(270deg, ${bgColor}, transparent 50%)`,
        minHeight: "100vh",
        pb: "2rem",
      }}
    >
      <Hero />
      <Features />
    </Container>
  );
}

export default LandingPage;
