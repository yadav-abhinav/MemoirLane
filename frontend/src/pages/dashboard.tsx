import { Container, Paper, useTheme } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import BottomPanel from "../components/dash/bottomDashpanel";
import DashPanel from "../components/dash/dashpanel";
import MediaTimeline from "../components/media/mediaTimeline";
import Sharing from "../components/sharing";
import { dashPanelMenuList } from "../util/constants";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(
    parseInt(localStorage.getItem("sel_pane") ?? "0")
  );

  const handleClick = (id: number) => {
    setSelected(id);
    localStorage.setItem("sel_pane", `${id}`);
    const href = dashPanelMenuList[id].href;
    if (href) navigate(href);
  };

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
        height: "100%",
        p: { md: "6rem 6rem 2rem", xs: "5.75rem 1rem 2.5rem" },
        background: `radial-gradient(circle at 50%, transparent, transparent 50%, ${bgColor} 100%)`,
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
          setSelected={handleClick}
        />
        <Routes>
          <Route path="/" element={<MediaTimeline />} />
          <Route path="/sharing" element={<Sharing />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <BottomPanel
          display={{ md: "none", xs: "block" }}
          selected={selected}
          setSelected={handleClick}
        />
      </Paper>
    </Container>
  );
}
