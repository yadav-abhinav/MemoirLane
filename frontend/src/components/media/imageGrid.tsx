import {
  Box,
  ImageList,
  ImageListItem,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useContext } from "react";
import { IMAGE_BASE_WIDTH, imageGridDimensions } from "../../util/constants";
import { mediaContext } from "../../util/context";
import { Media as MediaType } from "../../util/types";
import MediaCard from "./mediaCard";

const GAP = 3;
const getDimensions = (imageData: MediaType[]) => {
  const len = imageData.length;
  const maxCols = imageGridDimensions.reduce(
    (accumulator, val, i) => (i < len ? accumulator + val[1] : accumulator),
    0
  );
  return Math.min(10, maxCols);
};

export default function ImageGrid({ imageData }: { imageData: MediaType[] }) {
  const maxCols = getDimensions(imageData);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { fetchImageData } = useContext(mediaContext);

  return (
    <Box sx={{ overflow: "auto" }}>
      <ImageList
        variant="quilted"
        gap={GAP}
        cols={maxCols}
        rowHeight={IMAGE_BASE_WIDTH}
        sx={{ width: "fit-content" }}
      >
        {imageData.map((image, i) => {
          const imageCols = matches ? 1 : image.cols!;
          const imageWidth =
            imageCols * IMAGE_BASE_WIDTH + (imageCols - 1) * GAP;
          return (
            <mediaContext.Provider
              key={i}
              value={{ fetchImageData, media: image }}
            >
              <ImageListItem
                cols={imageCols}
                rows={image.rows}
                sx={{ width: imageWidth, overflow: "hidden" }}
                children={<MediaCard />}
              />
            </mediaContext.Provider>
          );
        })}
      </ImageList>
    </Box>
  );
}
