import { Close, MoreHoriz } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CircularProgress,
  Dialog,
  DialogProps,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Stack,
  styled,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import { mediaOptions, toastOptions } from "../../util/constants";
import { mediaContext } from "../../util/context";
import request from "../../util/requestHandler";
import MediaInfoDrawer from "./mediaInfoDrawer";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    theme.palette.mode == "light" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
}));

export default function MediaDialog({
  open,
  setOpen,
  favourite,
  setFavourite,
}: DialogProps & {
  setOpen: Dispatch<SetStateAction<boolean>>;
  favourite: boolean;
  setFavourite: () => void;
}) {
  const { media, fetchImageData } = useContext(mediaContext);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);
  const match = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const breakId = match ? 2 : 4;

  const handleDownload = async () => {
    try {
      const data = await fetch(media.src).then((res) => res.blob());
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", media.fileName);
      link.click();
    } catch (err) {
      toast.error("Error downloading image!");
    }
  };

  const handleDelete = () => {
    toast
      .promise(request.delete(`media/${media.id}`), ...toastOptions(1, "delet"))
      .then(() => {
        setOpen(false);
        fetchImageData();
      })
      .catch(() => {});
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const title = event.currentTarget.dataset.title!.toLowerCase();
    switch (title) {
      case "share": {
        break;
      }
      case "details": {
        setDrawerOpen((prev) => !prev);
        setAnchorEl(null);
        break;
      }
      case "favourite": {
        setFavourite();
        break;
      }
      case "delete": {
        handleDelete();
        setAnchorEl(null);
        break;
      }
    }
  };

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const option = event.currentTarget.dataset.option!.toLowerCase();
    switch (option) {
      case "download": {
        handleDownload();
        break;
      }
      case "album": {
        break;
      }
      case "details": {
        setDrawerOpen((prev) => !prev);
        break;
      }
      case "delete": {
        handleDelete();
        break;
      }
    }
    setAnchorEl(null);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      PaperComponent={StyledPaper}
    >
      <AppBar
        elevation={0}
        sx={{
          py: "0.5rem",
          position: "absolute",
          background: "transparent",
        }}
      >
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
            color="text.primary"
            flex={1}
            children={media.fileName}
          />
          <Stack gap="1rem" direction="row">
            {mediaOptions(favourite)
              .slice(0, breakId)
              .map((item) => (
                <Tooltip key={item.title} title={item.title}>
                  <IconButton
                    data-title={item.title}
                    onClick={handleClick}
                    children={<item.Icon />}
                  />
                </Tooltip>
              ))}
            <IconButton
              data-title={"Options"}
              onClick={(event) => setAnchorEl(event.currentTarget)}
              children={<MoreHoriz />}
            />
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
          >
            {mediaOptions(favourite)
              .slice(breakId)
              .map((item) => (
                <Box key={item.title}>
                  <MenuItem
                    data-option={item.title}
                    onClick={handleMenuClick}
                    sx={{ p: "1rem 2rem" }}
                  >
                    <ListItemIcon children={<item.Icon fontSize="small" />} />
                    {item.title}
                  </MenuItem>
                </Box>
              ))}
          </Menu>
        </Toolbar>
      </AppBar>
      {loading && <CircularProgress size={50} />}
      <>
        <Box pt="2rem" height="85%" display={loading ? "none" : "block"}>
          <img
            src={media.src}
            alt={media.fileName}
            hidden={loading}
            loading="lazy"
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
        </Box>
        {open && <MediaInfoDrawer open={drawerOpen} setOpen={setDrawerOpen} />}
      </>
    </Dialog>
  );
}
