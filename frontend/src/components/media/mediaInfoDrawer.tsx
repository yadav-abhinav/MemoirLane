import {
  AppBar,
  CircularProgress,
  Container,
  Drawer,
  DrawerProps,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AspectRatio, Close, InsertPhoto, Today } from "@mui/icons-material";
import request from "../../util/requestHandler";
import { MediaInfo } from "../../util/types";
import { mediaContext } from "../../util/context";

export default function MediaInfoDrawer({
  open,
  setOpen,
}: DrawerProps & { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const { media } = useContext(mediaContext);
  const [mediaInfo, setMediaInfo] = useState<MediaInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  const match = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("xs", "md")
  );

  // useEffect(() => {
  //   setLoading(true);
  //   request
  //     .get<MediaInfo>(`media/${media.id}`)
  //     .then((data) => {
  //       const exp = data.size > 2 ** 20 ? 20 : 10;
  //       data["unit"] = data.size > 2 ** 20 ? "MB" : "KB";
  //       data.size = Math.round(data.size / 2 ** exp);
  //       data.uploadedAt = new Date(data.uploadedAt);
  //       setMediaInfo(data);
  //       setLoading(false);
  //     })
  //     .catch(() => toast.error("Error loading Image info!"));
  // }, [media]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://picsum.photos/id/${media.id}/info`)
      .then((res) => res.json())
      .then((data) => {
        const randomDate = new Date();
        randomDate.setDate(Math.floor(Math.random() * 7 + 1));
        randomDate.setMonth(Math.floor(Math.random() * 2 + 1));
        data.uploadedAt = randomDate;
        data.src = data.download_url;
        data.fileName = "untitled";
        data.format = "jpg";
        data.size = 10000088;
        const exp = data.size > 2 ** 20 ? 20 : 10;
        data["unit"] = data.size > 2 ** 20 ? "MB" : "KB";
        data.size = Math.round(data.size / 2 ** exp);
        setMediaInfo(data);
        setLoading(false);
      })
      .catch(() => toast.error("Error loading image info!"))
      .finally(() => {});
  }, [media]);

  return (
    <Drawer
      anchor={match ? "bottom" : "right"}
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ sx: { minWidth: "20rem", pb: "1rem" } }}
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
      {loading ? (
        <Container
          maxWidth="xs"
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={50} />
        </Container>
      ) : (
        <List sx={{ px: "1rem" }}>
          <ListSubheader
            sx={{ color: "text.disabled", background: "inherit" }}
            children={"Details"}
          />
          <ListItem>
            <ListItemIcon children={<Today />} />
            <ListItemText
              primary={"Created"}
              secondary={mediaInfo!.uploadedAt.toLocaleDateString("en-US", {
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
              secondary={
                mediaInfo!.size +
                " " +
                mediaInfo!.unit +
                " - " +
                mediaInfo!.height +
                " × " +
                mediaInfo!.width
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon children={<InsertPhoto />} />
            <ListItemText
              primary={"Name"}
              secondary={mediaInfo!.fileName + "." + mediaInfo!.format}
            />
          </ListItem>
        </List>
      )}
    </Drawer>
  );
}
