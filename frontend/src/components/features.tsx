import { Avatar, Divider, Paper, Stack, Typography } from "@mui/material";
import { feature } from "../util/types";
import { featureList } from "../util/constants";

const getFeatureCard = (id: number, feature: feature) => {
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
        <feature.Icon />
      </Avatar>

      <Typography variant="button">{feature.title}</Typography>
      <Typography
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
        align="center"
        justifyContent="center"
      >
        {feature.description}
      </Typography>
    </Paper>
  );
};

function Features() {
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
      {featureList.map((feature, index) => getFeatureCard(index, feature))}
    </Stack>
  );
}

export default Features;
