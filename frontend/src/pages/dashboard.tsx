import { Container, Paper, useTheme } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import DashPanel from "../components/dashpanel";
import MediaContainer from "../components/mediaContainer";

export default function Dashboard() {
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "light"
      ? "rgba(17, 153, 158, 0.3)"
      : "rgba(38, 80, 115, 0.3)";
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        background: `radial-gradient(circle at 50%, transparent, transparent 50%, ${bgColor} 100%)`,
        minHeight: "100vh",
        p: "6rem 6rem 1rem 6rem",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          height: "calc(100vh - 7rem)",
          borderRadius: "2.5rem",
          display: "flex",
        }}
      >
        <DashPanel />
        <Routes>
          <Route path="/" element={<MediaContainer />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Paper>
    </Container>
  );
}
