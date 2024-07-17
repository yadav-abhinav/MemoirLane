import { Button, Grid, Typography, Box, styled } from "@mui/material";
import { ArrowForwardIos, Code } from "@mui/icons-material";
import heroBg from "../assets/hero-bg.svg";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(180deg, ${
    theme.palette.mode === "light"
      ? "rgba(17, 153, 158, 0.1)"
      : "rgba(38, 80, 115, 0.1)"
  }, transparent 25%)`,
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  minHeight: "40rem",
  minwidth: "60rem",
  background:
    `linear-gradient(180deg, ${
      theme.palette.mode === "light"
        ? "rgba(17, 153, 158, 0.1)"
        : "rgba(38, 80, 115, 0.1)"
    }, transparent 25%), ` +
    (theme.palette.mode === "light"
      ? `linear-gradient(to left, transparent, #fff), linear-gradient(to top, transparent, #fff),`
      : `linear-gradient(to left, transparent, ${theme.palette.background.default}), linear-gradient(to top, transparent, ${theme.palette.background.default}),`) +
    ` url(${heroBg})`,
  filter: "blur(2px)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  paddingTop: "6rem",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "25rem",
  background:
    (theme.palette.mode === "light"
      ? `linear-gradient(180deg, rgba(17, 153, 158, 0.1), #fff 50%, transparent 100%), linear-gradient(to top, rgba(255,255,255,0), #fff 50%),`
      : `linear-gradient(180deg, rgba(17, 153, 158, 0.1), ${theme.palette.background.default} 50%, transparent 100%), linear-gradient(to top, rgba(255,255,255,0), ${theme.palette.background.default} 50%),`) +
    ` url(${heroBg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
}));

const StyledText = styled(Typography)({
  fontFamily: `"Exo 2", sans-serif`,
  fontOpticalSizing: "auto",
  fontWeight: "600",
}) as typeof Typography;

export default function Hero() {
  return (
    <>
      {/* Hero - MEDIUM */}
      <StyledGrid container display={{ xs: "none", md: "flex" }}>
        <Grid item md={6} pl="5rem">
          <StyledText
            component="h1"
            variant="h1"
            children={"Where Every Photo Tells a Story."}
          />
          <Box sx={{ mt: "2rem" }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIos />}
              href="/signUp"
              sx={{ borderRadius: "3px" }}
              children={"Start Sharing"}
            />
            <Button
              variant="outlined"
              size="large"
              endIcon={<Code />}
              href="https://github.com/yadav-abhinav/MemoirLane"
              target="_blank"
              sx={{ ml: "1rem", borderRadius: "3px", borderWidth: "2px" }}
              children={"Source Code"}
            />
          </Box>
        </Grid>
        <StyledGridItem item md={6} />
      </StyledGrid>

      {/* Hero - SMALL */}
      <StyledBox display={{ xs: "flex", md: "none" }}>
        <Typography
          component="h1"
          variant="h1"
          align="center"
          sx={{
            fontFamily: `"Exo 2", sans-serif`,
            fontOpticalSizing: "auto",
            fontWeight: "600",
          }}
          children={"Where Every Photo Tells a Story."}
        />
        <Box sx={{ mt: "1.5rem" }}>
          <Button
            variant="contained"
            size="small"
            endIcon={<ArrowForwardIos />}
            href="/signUp"
            sx={{ borderRadius: "3px" }}
            children={"Start Sharing"}
          />
        </Box>
      </StyledBox>
    </>
  );
}
