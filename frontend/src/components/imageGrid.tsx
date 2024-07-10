import { ImageList, ImageListItem } from "@mui/material";
import { IMAGE_BASE_WIDTH, imageGridDimensions } from "../util/constants";
import { MediaInfo } from "../util/types";

const getDimensions = (imageData: MediaInfo[]) => {
  const len = imageData.length;
  const totalWidth = imageGridDimensions.reduce(
    (accumulator, val, i) => (i < len ? accumulator + val[1] : accumulator),
    0
  );
  return totalWidth;
};

export default function ImageGrid({ imageData }: { imageData: MediaInfo[] }) {
  const totalWidth = getDimensions(imageData);
  return (
    <ImageList
      variant="quilted"
      gap={3}
      cols={totalWidth > 10 ? 10 : totalWidth}
      rowHeight={IMAGE_BASE_WIDTH}
    >
      {imageData.map((image, i) => (
        <ImageListItem
          key={i}
          cols={image.cols}
          rows={image.rows}
          sx={{ width: image.cols! * IMAGE_BASE_WIDTH }}
        >
          <img src={image.src} alt={image.caption} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
