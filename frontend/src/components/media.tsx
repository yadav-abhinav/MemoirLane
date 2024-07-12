import { Box, Skeleton } from "@mui/material";
import { MediaInfo } from "../util/types";
import { useState } from "react";

export default function Media({ image }: { image: MediaInfo }) {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <>
      <Box height="100%">
        {loading && (
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            animation="wave"
          />
        )}
        <img
          src={image.src}
          height={loading ? 0 : "auto"}
          alt={image.caption}
          loading="lazy"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          onLoad={() => setTimeout(() => setLoading(false), 2000)}
        />
      </Box>
    </>
  );
}
