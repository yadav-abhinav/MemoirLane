import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ImageGrid from "./imageGrid";
import { imageGridDimensions } from "../util/constants";
import { MediaInfo, MediaTimelineMap } from "../util/types";

function groupImageData(imageData: MediaInfo[]) {
  const groupedImageData: MediaTimelineMap = {};
  imageData.forEach((item) => {
    const randomDate = new Date();
    randomDate.setDate(Math.floor(Math.random() * 7 + 1));
    randomDate.setMonth(Math.floor(Math.random() * 2 + 1));
    item.uploadedAt = randomDate;
    item.src = item.download_url;
    const year = item.uploadedAt.getFullYear();
    const month = item.uploadedAt.getMonth();
    const day = item.uploadedAt.getDate();
    const date = new Date(0).setFullYear(year, month);
    if (!groupedImageData[date]) groupedImageData[date] = {};
    if (!groupedImageData[date][day]) groupedImageData[date][day] = [];
    const len = groupedImageData[date][day].length;
    [item.rows, item.cols] =
      imageGridDimensions[len % imageGridDimensions.length];
    groupedImageData[date][day].push(item);
  });
  return groupedImageData;
}

export default function MediaContainer() {
  const [imageData, setData] = useState<MediaTimelineMap>({});

  const getImageData = async () => {
    const res = await fetch("https://picsum.photos/v2/list?page=1&limit=30");
    const data = await res.json();
    setData(groupImageData(data));
  };

  useEffect(() => {
    (async () => {
      await getImageData();
    })();
  }, []);
  return (
    <Box
      pl={{ md: "3.5rem", xs: "1.5rem" }}
      pt="2rem"
      position={{ md: "relative", xs: "static" }}
      left="-2.4rem"
      sx={{
        background: "inherit",
        borderRadius: "2.5rem",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {Object.keys(imageData)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map((month) => {
          const date = new Date(parseInt(month));
          const dateHeading = date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          });
          return (
            <Box key={month}>
              <Typography variant="h4">{dateHeading}</Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                // direction="row"
                useFlexGap
                spacing={1}
                flexWrap="wrap"
                pb="3rem"
                pr="1.5rem"
                sx={{ columnGap: { md: "3.5rem" } }}
              >
                {Object.keys(imageData[month])
                  .sort((a, b) => parseInt(b) - parseInt(a))
                  .map((day) => {
                    const fullDate = new Date(date).setDate(parseInt(day));
                    const dayHeading = new Date(fullDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }
                    );
                    return (
                      <Box key={day} width={{ xs: "100%", md: "fit-content" }}>
                        <Typography variant="button" color="text.secondary">
                          {dayHeading}
                        </Typography>
                        <ImageGrid imageData={imageData[month][day]} />
                      </Box>
                    );
                  })}
              </Stack>
            </Box>
          );
        })}
    </Box>
  );
}
