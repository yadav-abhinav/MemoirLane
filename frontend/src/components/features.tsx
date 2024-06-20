import { Avatar, Divider, Paper, Stack, Typography } from "@mui/material";
import { feature } from "../util/types";
import {
  IosShare,
  AutoFixHigh,
  CollectionsBookmark,
} from "@mui/icons-material";

const featureList: feature[] = [
  {
    title: "Photo Sharing",
    description:
      "Capture, share, and relive your favorite moments with our seamless photo sharing feature. Easily upload your photos and add captions to preserve memories.",
    logo: <IosShare />,
  },
  {
    title: "Photo Editing",
    description:
      "Unleash your creativity with our powerful photo editing feature. Enhance your images with a variety of tools, including filters, cropping and more, and special effects.",
    logo: <AutoFixHigh />,
  },
  {
    title: "Photo Album",
    description:
      "Organize and cherish your memories with our versatile photo album feature. Create custom albums to categorize your photos and easily navigate your collection.",
    logo: <CollectionsBookmark />,
  },
];

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
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>{feature.logo}</Avatar>

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
