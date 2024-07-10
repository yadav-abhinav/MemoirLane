import { Avatar, Divider, Paper, Stack, Typography } from "@mui/material";
import { Feature } from "../util/types";
import { FeatureList } from "../util/constants";

const getFeatureCard = (id: number, Feature: Feature) => {
  return (
    <Paper
      key={id}
      elevation={0}
      sx={{
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "transparent",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <Feature.Icon />
      </Avatar>

      <Typography variant="button">{Feature.title}</Typography>
      <Typography
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
        align="center"
        justifyContent="center"
      >
        {Feature.description}
      </Typography>
    </Paper>
  );
};

export default function Features() {
  return (
    <Stack
      mt="2rem"
      direction={{ md: "row", xs: "column" }}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={{ lg: 8, md: 4, xs: 2 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {FeatureList.map((Feature, index) => getFeatureCard(index, Feature))}
    </Stack>
  );
}