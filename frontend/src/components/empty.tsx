import { Box, Container, Typography } from "@mui/material";
import empty from "../assets/empty.png";

export default function Empty() {
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
        <img height={150} src={empty} alt="error" />
        <Typography
          gutterBottom
          variant="h4"
          textAlign="center"
          mt="2rem"
          mb="0.5rem"
          children={"Nothing to see here!"}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          children={"Ready to add some photos?"}
        />
      </Box>
    </Container>
  );
}
