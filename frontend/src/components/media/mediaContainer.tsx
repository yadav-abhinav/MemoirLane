import {
  Box,
  BoxProps,
  CircularProgress,
  Container,
  styled,
} from "@mui/material";
import Empty from "../dash/empty";
import MediaLoadError from "../dash/loadError";

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

export default function MediaContainer({
  sx,
  children,
  error,
  loading,
  dataPresent,
}: {
  error?: boolean;
  loading?: boolean;
  dataPresent?: boolean;
} & BoxProps) {
  if (error) return <MediaLoadError />;

  return (
    <>
      <StyledBox
        pl={{ md: "3.5rem", xs: "1.5rem" }}
        position={{ md: "relative", xs: "static" }}
        sx={{ ...sx }}
      >
        {loading ? (
          <StyledContainer
            maxWidth="xs"
            children={<CircularProgress size={50} />}
          />
        ) : (
          <>{!dataPresent ? <Empty /> : children}</>
        )}
      </StyledBox>
    </>
  );
}
