import { Container, Paper, useTheme } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import DashPanel from "../components/dashpanel";
import MediaContainer from "../components/mediaContainer";
import { useState } from "react";
import BottomPanel from "../components/bottomDashpanel";

export default function Dashboard() {
  const [selected, setSelected] = useState(0);

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
        height: "100%",
        p: { md: "6rem 6rem 2rem", xs: "5.75rem 1rem 2.5rem" },
      }}
    >
      <Paper
        elevation={10}
        sx={{
          height: "100%",
          borderRadius: "2.5rem",
          display: "flex",
        }}
      >
        <DashPanel
          display={{ md: "block", xs: "none" }}
          selected={selected}
          setSelected={setSelected}
        />
        <Routes>
          <Route path="/" element={<MediaContainer />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <BottomPanel
          display={{ md: "none", xs: "block" }}
          selected={selected}
          setSelected={setSelected}
        />
      </Paper>
    </Container>
  );
}
