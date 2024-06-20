import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import { themeTogglerProps } from "../util/types";

function ToggleColorMode({ mode, toggleColorMode }: themeTogglerProps) {
  return (
    <Box sx={{ maxWidth: "32px" }}>
      <Button
        variant="text"
        onClick={toggleColorMode}
        size="small"
        aria-label="button to toggle theme"
        sx={{
          minWidth: "32px",
          height: "32px",
          p: "4px",
          borderRadius: "999px",
        }}
      >
        {mode === "dark" ? (
          <WbSunnyRoundedIcon fontSize="small" sx={{ color: "white" }} />
        ) : (
          <ModeNightRoundedIcon fontSize="small" sx={{ color: "black" }} />
        )}
      </Button>
    </Box>
  );
}

export default ToggleColorMode;
