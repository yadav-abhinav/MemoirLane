import { MoreVert } from "@mui/icons-material";
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Skeleton,
    styled,
    Typography
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { albumOptions, profileSettings } from "../util/constants";

const ImageOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
  background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))",
});

const OptionsButton = styled(IconButton)({
  color: "white",
  position: "absolute",
  right: 0,
  zIndex: 2,
});

export default function Sharing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const option = event.currentTarget.dataset.option!.toLowerCase();
    switch (option) {
      case "leave": {
        break;
      }
      case "delete": {
        break;
      }
      case "link": {
        break;
      }
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container columns={12} p="2rem 1.5rem 3rem" spacing="0.75rem">
        {profileSettings
          .concat(profileSettings)
          .concat(profileSettings)
          .map((item) => (
            <Grid item xs={6}>
              <Card
                sx={{
                  borderRadius: "15px",
                  position: "relative",
                }}
              >
                {loading && (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%"
                    animation="wave"
                  />
                )}
                <OptionsButton
                  disableFocusRipple
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  children={<MoreVert />}
                />
                <CardActionArea onClick={() => true}>
                  <CardMedia
                    component="img"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsD2O5K-e-ed7iR145GuU0JarC2x37xvmqEA&s"
                    onLoad={() => setTimeout(() => setLoading(false), 2000)}
                  />
                  <ImageOverlay />
                </CardActionArea>
              </Card>
              <Typography fontWeight={500} children={item.title} mt="0.25rem" />
            </Grid>
          ))}
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {albumOptions.map((item) => (
            <MenuItem
              key={item.title}
              data-option={item.title}
              onClick={handleMenuClick}
              sx={{ py: 0 }}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </>
  );
}
