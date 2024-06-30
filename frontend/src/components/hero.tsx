import { Button, Grid, Typography, useTheme, Box } from "@mui/material";
import { ArrowForwardIos, Code } from "@mui/icons-material";
import heroBg from "../assets/hero-bg.svg";

function Hero() {
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "light"
      ? "rgba(17, 153, 158, 0.1)"
      : "rgba(38, 80, 115, 0.1)";

  return (
    <>
      {/* Hero - MEDIUM */}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          display: { xs: "none", md: "flex" },
          background: `linear-gradient(180deg, ${bgColor}, transparent 25%)`,
        }}
      >
        <Grid
          item
          md={6}
          sx={{
            pl: "5rem",
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontFamily: `"Exo 2", sans-serif`,
              fontOpticalSizing: "auto",
              fontWeight: "600",
            }}
          >
            Where Every Photo Tells a Story.
          </Typography>
          <Box sx={{ mt: "2rem" }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIos />}
              href="/signUp"
              sx={{ borderRadius: "3px" }}
            >
              Start Sharing
            </Button>
            <Button
              variant="outlined"
              size="large"
              endIcon={<Code />}
              href="https://github.com/yadav-abhinav/MemoirLane"
              target="_blank"
              sx={{ ml: "1rem", borderRadius: "3px", borderWidth: "2px" }}
            >
              Source Code
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            minHeight: "40rem",
            minwidth: "60rem",
            background:
              `linear-gradient(180deg, ${bgColor}, transparent 25%), ` +
              (theme.palette.mode === "light"
                ? `linear-gradient(to left, transparent, #fff), linear-gradient(to top, transparent, #fff),`
                : `linear-gradient(to left, transparent, ${theme.palette.background.default}), linear-gradient(to top, transparent, ${theme.palette.background.default}),`) +
              ` url(${heroBg})`,
            filter: "blur(2px)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Grid>
      </Grid>

      {/* Hero - SMALL */}
      <Box
        sx={{
          pt: "6rem",
          display: { xs: "flex", md: "none" },
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
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          align="center"
          sx={{
            fontFamily: `"Exo 2", sans-serif`,
            fontOpticalSizing: "auto",
            fontWeight: "600",
          }}
        >
          Where Every Photo Tells a Story.
        </Typography>

        <Box sx={{ mt: "1.5rem" }}>
          <Button
            variant="contained"
            size="small"
            endIcon={<ArrowForwardIos />}
            href="/signUp"
            sx={{ borderRadius: "3px" }}
          >
            Start Sharing
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Hero;
