import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { dashPanelMenuList, profileSettings } from "../util/constants";
import { useState } from "react";
import { darkTheme } from "../util/theme";

export default function DashPanel() {
  const [selected, setSelected] = useState(0);

  return (
    <Box
      overflow="auto"
      sx={{
        bgcolor: "rgb(38, 80, 115)",
        minWidth: "20rem",
        pt: "2rem",
        borderRadius: "2.5rem 0 0 2.5rem",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <List>
        <ListSubheader
          sx={{
            color: darkTheme.palette.text.disabled,
            bgcolor: "transparent",
          }}
        >
          Library
        </ListSubheader>
        {dashPanelMenuList.map((item, id) => (
          <ListItem
            key={id}
            disablePadding
            sx={{ color: darkTheme.palette.text.secondary }}
          >
            <ListItemButton
              onClick={() => setSelected(id)}
              sx={{
                background:
                  selected === id
                    ? "linear-gradient(to right, rgba(255,255,255, 1), rgba(255,255,255, 0.6) 2%, rgba(255,255,255, 0.1) 0.1%, transparent)"
                    : "transparent",
              }}
            >
              <ListItemIcon
                sx={{ pl: "1rem", color: darkTheme.palette.text.secondary }}
              >
                <item.Icon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider
        flexItem
        variant="middle"
        sx={{
          my: "0.5rem",
          borderColor: darkTheme.palette.divider,
        }}
      />
      <List>
        {profileSettings.map((item, id) => (
          <ListItem
            key={id}
            disablePadding
            sx={{ color: darkTheme.palette.text.secondary }}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{ pl: "1rem", color: darkTheme.palette.text.secondary }}
              >
                <item.Icon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
