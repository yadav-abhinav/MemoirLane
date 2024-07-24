import { Star, StarBorder } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Skeleton,
  styled,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { mediaContext } from "../../util/context";
import request from "../../util/requestHandler";
import MediaDialog from "./mediaDialog";

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

export default function MediaCard() {
  const { media } = useContext(mediaContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [starred, setStarred] = useState<boolean>(!!media.favourite);
  const [open, setOpen] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFavouriteClick = async () => {
    request
      .patch(`media/${media.id}/favourite`)
      .then(() => setStarred((prev) => !prev))
      .catch(() => toast.error("Error adding image to favourites!"));
  };

  useEffect(() => {
    if (imgRef.current?.complete) setLoading(false);
  }, [imgRef]);

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
            height={loading ? 0 : "auto"}
            loading="lazy"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            onLoad={() => setTimeout(() => setLoading(false), 2000)}
          />
        </CardActionArea>
      </Card>
      {open && (
        <MediaDialog
          open={open}
          setOpen={setOpen}
          favourite={starred}
          setFavourite={handleFavouriteClick}
        />
      )}
    </>
  );
}
