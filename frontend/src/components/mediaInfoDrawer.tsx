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
import { Media } from "../util/types";
import { Dispatch, SetStateAction } from "react";
import { AspectRatio, Close, InsertPhoto, Today } from "@mui/icons-material";

export default function MediaDrawer({
  open,
  setOpen,
  media,
}: DrawerProps & {
  setOpen: Dispatch<SetStateAction<boolean>>;
  media: Media;
}) {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
    >
      <AppBar elevation={0} position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setOpen(false)}
            children={<Close />}
          />
          <Typography
            px="1rem"
            fontSize="1rem"
            variant="button"
            children={"Info"}
          />
        </Toolbar>
      </AppBar>
      <List sx={{ px: "1rem" }}>
        <ListSubheader
          sx={{ color: "text.disabled", background: "inherit" }}
          children={"Details"}
        />
        <ListItem>
          <ListItemIcon children={<Today />} />
          <ListItemText
            primary={"Created"}
            secondary={media.uploadedAt.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon children={<AspectRatio />} />
          <ListItemText
            primary={"Size"}
            secondary={media.size + " - " + media.height + " × " + media.width}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon children={<InsertPhoto />} />
          <ListItemText
            primary={"Name"}
            secondary={media.fileName + "." + media}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}
