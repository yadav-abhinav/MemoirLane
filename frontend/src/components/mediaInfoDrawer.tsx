import {
  AppBar,
  Drawer,
  DrawerProps,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { MediaInfo } from "../util/types";
import { Dispatch, SetStateAction } from "react";
import { Close } from "@mui/icons-material";

export default function MediaInfoDrawer({
  open,
  setOpen,
  media,
}: DrawerProps & {
  setOpen: Dispatch<SetStateAction<boolean>>;
  media: MediaInfo;
}) {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{ zIndex: (theme) => theme.zIndex.modal + 999 }}
    >
      <List>
        <AppBar
          elevation={0}
          sx={{ py: "0.5rem", position: "relative", background: "transparent" }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
            <Typography
              px="1rem"
              fontSize="1rem"
              variant="button"
              color="text.primary"
              flex={1}
            >
              {media.fileName}
            </Typography>
          </Toolbar>
        </AppBar>
        <ListSubheader
          sx={{
            color: "text.disabled",
            bgcolor: "transparent",
          }}
        >
          Details
        </ListSubheader>
        {Object.keys(media).map((key, id) => (
          <ListItem key={id} disablePadding sx={{ color: "text.secondary" }}>
            <ListItemIcon sx={{ pl: "1rem", color: "text.secondary" }}>
              <Close />
            </ListItemIcon>
            <ListItemText primary={key} secondary={media[key]!.toString()} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
