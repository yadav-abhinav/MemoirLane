import { Box, Container, Link, Typography, useTheme } from "@mui/material";
import wrongDark from "../assets/wrong-dark.png";
import wrongLight from "../assets/wrong-light.png";

export default function LoadError() {
  const theme = useTheme();
  return (
    <Container
      maxWidth={"sm"}
      sx={{
        height: "100%",
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          height={150}
          width={150}
          src={theme.palette.mode == "light" ? wrongLight : wrongDark}
          alt="error"
        />
        <Typography
          gutterBottom
          variant="h4"
          textAlign="center"
          mt="1.5rem"
          mb="0.5rem"
        >
          Oh snap!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Something went wrong! Try
          <Link
            style={{ cursor: "pointer" }}
            variant="body2"
            sx={{ mx: "0.3rem" }}
            onClick={() => {
              window.location.reload();
            }}
          >
            reloading
          </Link>
          this webpage.
        </Typography>
      </Box>
    </Container>
  );
}
