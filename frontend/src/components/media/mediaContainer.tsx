import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ImageGrid from "./imageGrid";
import { imageGridDimensions } from "../../util/constants";
import { Media, MediaTimelineMap } from "../../util/types";
import request from "../../util/requestHandler";
import Uploader from "./uploader";
import MediaLoadError from "../dash/loadError";
import Empty from "../dash/empty";
import { mediaContext } from "../../util/context";

const StyledBox = styled(Box)({
  width: "calc(100% + 2.4rem)",
  paddingTop: "2rem",
  left: "-2.4rem",
  background: "inherit",
  borderRadius: "2.5rem",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const StyledContainer = styled(Container)({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingRight: "2rem",
});

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

export default function MediaContainer() {
  const [imageData, setData] = useState<MediaTimelineMap>({});
  const [error, setError] = useState<boolean>(false);
  const [dataPresent, setDataPresent] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchImageData = async (page: number = 1) => {
    setLoading(true);
    try {
      const data = await request.get<{ images: Media[] }>("user/media", {
        params: { page },
      });
      setDataPresent(!!data.images.length);
      setData(groupImageData(data.images));
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // const fetchImageData = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch("https://picsum.photos/v2/list?page=1&limit=30");
  //     const data = await res.json();
  //     data.forEach((item: Media) => {
  //       const randomDate = new Date();
  //       randomDate.setDate(Math.floor(Math.random() * 7 + 1));
  //       randomDate.setMonth(Math.floor(Math.random() * 2 + 1));
  //       item.uploadedAt = randomDate;
  //       item.src = item.download_url;
  //       item.fileName = "untitled";
  //     });
  //     if (!data.length) setDataPresent(false);
  //     setData(groupImageData(data));
  //   } catch (err) {
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchImageData();
  }, []);

  if (error) return <MediaLoadError />;

  return (
    <>
      <mediaContext.Provider value={{ fetchImageData, media: {} as Media }}>
        <StyledBox
          pl={{ md: "3.5rem", xs: "1.5rem" }}
          position={{ md: "relative", xs: "static" }}
        >
          {loading ? (
            <StyledContainer
              maxWidth="xs"
              children={<CircularProgress size={50} />}
            />
          ) : (
            <>
              {!dataPresent ? (
                <Empty />
              ) : (
                Object.keys(imageData)
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
                          useFlexGap
                          flexWrap="wrap"
                          pb="3rem"
                          pr="1.5rem"
                          sx={{ columnGap: { md: "3.6rem" } }}
                        >
                          {Object.keys(imageData[month])
                            .sort((a, b) => parseInt(b) - parseInt(a))
                            .map((day) => {
                              const fullDate = new Date(date).setDate(
                                parseInt(day)
                              );
                              const dayHeading = new Date(
                                fullDate
                              ).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              });
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
                                  <ImageGrid
                                    imageData={imageData[month][day]}
                                  />
                                </Box>
                              );
                            })}
                        </Stack>
                      </Box>
                    );
                  })
              )}
            </>
          )}
        </StyledBox>
        <Uploader fetchImageData={fetchImageData} />
      </mediaContext.Provider>
    </>
  );
}
