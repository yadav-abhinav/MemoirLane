import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { uploadActions } from "../util/constants";
import { useState } from "react";

export default function Uploader() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{
        position: "fixed",
        bottom: { md: "5rem", xs: "6.5rem" },
        right: { md: "9rem", xs: "2.5rem" },
      }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {uploadActions.map((action) => (
        <SpeedDialAction
          key={action.title}
          icon={<action.Icon />}
          tooltipTitle={action.title}
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  );
}
