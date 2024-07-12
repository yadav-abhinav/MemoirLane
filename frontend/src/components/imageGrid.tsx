import {
  Box,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IMAGE_BASE_WIDTH, imageGridDimensions } from "../util/constants";
import { MediaInfo } from "../util/types";
import Media from "./media";

const getDimensions = (imageData: MediaInfo[]) => {
  const len = imageData.length;
  const maxCols = imageGridDimensions.reduce(
    (accumulator, val, i) => (i < len ? accumulator + val[1] : accumulator),
    0
  );
  return Math.min(10, maxCols);
};

export default function ImageGrid({ imageData }: { imageData: MediaInfo[] }) {
  const maxCols = getDimensions(imageData);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("xs", "md"));

  return (
    <Box sx={{ overflow: "auto" }}>
      <ImageList
        variant="quilted"
        gap={3}
        cols={maxCols}
        rowHeight={IMAGE_BASE_WIDTH}
        sx={{ width: "fit-content" }}
      >
        {imageData.map((image, i) => {
          const imageCols = matches ? 1 : image.cols!;
          return (
            <ImageListItem
              key={i}
              cols={imageCols}
              rows={image.rows}
              sx={{
                width: imageCols * IMAGE_BASE_WIDTH,
                overflow: "hidden",
              }}
            >
              <Media image={image} />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}
