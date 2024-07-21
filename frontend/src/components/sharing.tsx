import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import {
  albumOptions,
  profileSettings,
  sharingTableHeaders,
} from "../util/constants";
import MediaContainer from "./media/mediaContainer";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  maxHeight: "90%",
  background: "inherit",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const StyledAvatarGroup = styled(AvatarGroup)({
  display: "inline-flex",
  marginRight: "1rem",
  width: "fit-content",
  "& .MuiAvatar-root": {
    height: "25px",
    width: "25px",
  },
});

const renderSurplus = (surplus: number) => (
  <Typography variant="caption" pl={0.3}>
    +{surplus}
  </Typography>
);

export default function Sharing() {
  const [error, setError] = useState<boolean>(false);
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
    <MediaContainer loading={loading} dataPresent={true} error={error}>
      <Typography variant="h4" children={"Sharing"} />
      <TableContainer component={StyledBox}>
        <Table stickyHeader sx={{ maxWidth: "80%", background: "inherit" }}>
          <TableHead sx={{ background: "inherit" }}>
            <TableRow sx={{ background: "inherit" }}>
              {sharingTableHeaders.map((item) => (
                <TableCell
                  key={item}
                  className="MuiPaper-elevation10"
                  sx={{
                    "&:not(:first-child)": { textAlign: "center" },
                    background: "inherit",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.disabled"
                    children={item}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {profileSettings
              .concat(profileSettings)
              .concat(profileSettings)
              .map((item, id) => (
                <TableRow
                  key={item.title}
                  sx={{
                    "& .MuiTableCell-root": { p: 0 },
                    "&:last-child td, &:last-child th": { border: 0 },
                    "& > :not(:first-child)": { textAlign: "center" },
                  }}
                >
                  <TableCell
                    width="500px"
                    sx={{ borderRadius: "10px 0 0 10px" }}
                  >
                    <ListItemButton>
                      <ListItemAvatar sx={{ p: "1rem" }}>
                        <Avatar
                          src={
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsD2O5K-e-ed7iR145GuU0JarC2x37xvmqEA&s"
                          }
                          sx={{
                            borderRadius: "10px",
                            height: "60px",
                            width: "60px",
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography
                              variant="h6"
                              fontWeight={300}
                              children={item.title}
                            />
                          </Box>
                        }
                        secondary={
                          <Box display="flex" alignItems="center" pt="0.5rem">
                            <StyledAvatarGroup
                              max={4}
                              renderSurplus={renderSurplus}
                            >
                              <Avatar></Avatar>
                              <Avatar></Avatar>
                              <Avatar></Avatar>
                              <Avatar></Avatar>
                              <Avatar></Avatar>
                            </StyledAvatarGroup>
                            You, Wade, Logan and 5 other
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      children={"124 images"}
                    />
                  </TableCell>
                  <TableCell>{"You"}</TableCell>
                  <TableCell>{new Date().toDateString()}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(event) => setAnchorEl(event.currentTarget)}
                      children={<MoreVert />}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={() => setAnchorEl(null)}
        >
          {albumOptions.map((item) => (
            <Box key={item.title}>
              <MenuItem
                data-option={item.title}
                onClick={handleMenuClick}
                sx={{ p: "0.75rem 2rem" }}
              >
                {item.title}
              </MenuItem>
            </Box>
          ))}
        </Menu>
      </TableContainer>
    </MediaContainer>
  );
}
