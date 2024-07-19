import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Skeleton,
  styled,
} from "@mui/material";
import { Media as MediaType } from "../util/types";
import { useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import MediaDialog from "./mediaDialog";
import request from "../util/requestHandler";
import { toast } from "react-toastify";

const ImageOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
  background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))",
  opacity: 0,
  transition: "all 0.4s ease",
  "&:hover": {
    opacity: 1,
  },
});

const FavButton = styled(IconButton)({
  color: "white",
  position: "absolute",
  zIndex: 2,
  opacity: 0,
});

export default function Media({ media }: { media: MediaType }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [starred, setStarred] = useState<boolean>(!!media.favourite);
  const [open, setOpen] = useState<boolean>(false);

  const handleFavouriteClick = async () => {
    setStarred((prev) => !prev);
    try {
      await request.patch(`media/${media.id}/favourite`);
    } catch {
      toast.error("Error adding image to favourites!");
    }
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          "&:hover": {
            "& .fav-button": {
              opacity: 1,
            },
          },
        }}
      >
        {loading && (
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            animation="wave"
          />
        )}
        <FavButton
          className="fav-button"
          disableFocusRipple
          onClick={handleFavouriteClick}
          children={starred ? <Star /> : <StarBorder />}
        />
        <CardActionArea sx={{ height: "100%" }} onClick={() => setOpen(true)}>
          <ImageOverlay />
          <img
            src={media.src}
            hidden={loading}
            loading="lazy"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            onLoad={() => setTimeout(() => setLoading(false), 1000)}
          />
        </CardActionArea>
      </Card>
      <MediaDialog
        open={open}
        setOpen={setOpen}
        favourite={starred}
        setFavourite={handleFavouriteClick}
        id={media.id}
      />
    </>
  );
}
