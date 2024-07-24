import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { imageGridDimensions } from "../../util/constants";
import { mediaContext } from "../../util/context";
import { Media, MediaTimelineMap } from "../../util/types";
import ImageGrid from "./imageGrid";
import MediaContainer from "./mediaContainer";
import Uploader from "./uploader";

function groupImageData(imageData: Media[]) {
  const groupedImageData: MediaTimelineMap = {};
  imageData.forEach((item) => {
    const uploadedAt = new Date(item.uploadedAt);
    const day = uploadedAt.getDate();
    const date = new Date(0).setFullYear(
      uploadedAt.getFullYear(),
      uploadedAt.getMonth()
    );
    if (!groupedImageData[date]) groupedImageData[date] = {};
    if (!groupedImageData[date][day]) groupedImageData[date][day] = [];
    const len = groupedImageData[date][day].length;
    [item.rows, item.cols] =
      imageGridDimensions[len % imageGridDimensions.length];
    groupedImageData[date][day].push(item);
  });
  return groupedImageData;
}

export default function MediaTimeline() {
  const [imageData, setData] = useState<MediaTimelineMap>({});
  const [dataPresent, setDataPresent] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const fetchImageData = async (page: number = 1) => {
  //   setLoading(true);
  //   try {
  //     const data = await request.get<{ images: Media[] }>("user/media", {
  //       params: { page },
  //     });
  //     setDataPresent(!!data.images.length);
  //     setData(groupImageData(data.images));
  //   } catch (err) {
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchImageData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://picsum.photos/v2/list?page=1&limit=30");
      const data = await res.json();
      data.forEach((item: Media) => {
        const randomDate = new Date();
        randomDate.setDate(Math.floor(Math.random() * 7 + 1));
        randomDate.setMonth(Math.floor(Math.random() * 2 + 1));
        item.uploadedAt = randomDate;
        item.src = item.download_url;
        item.fileName = "untitled";
      });
      if (!data.length) setDataPresent(false);
      setData(groupImageData(data));
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  return (
    <MediaContainer loading={loading} dataPresent={dataPresent} error={error}>
      <mediaContext.Provider value={{ fetchImageData, media: {} as Media }}>
        {Object.keys(imageData)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((month) => {
            const date = new Date(parseInt(month));
            const dateHeading = date.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            });
            return (
              <Box
                key={month}
                pl={{ md: "3.5rem", xs: "1.5rem" }}
                pr="1.5rem"
                pb="3rem"
              >
                <Typography variant="h4" children={dateHeading} />
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  useFlexGap
                  flexWrap="wrap"
                  columnGap="3.6rem"
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
                        <Box
                          key={day}
                          width={{ xs: "100%", md: "fit-content" }}
                        >
                          <Typography
                            variant="button"
                            color="text.secondary"
                            children={dayHeading}
                          />
                          <ImageGrid imageData={imageData[month][day]} />
                        </Box>
                      );
                    })}
                </Stack>
              </Box>
            );
          })}
        <Uploader reloadData={fetchImageData} />
      </mediaContext.Provider>
    </MediaContainer>
  );
}
