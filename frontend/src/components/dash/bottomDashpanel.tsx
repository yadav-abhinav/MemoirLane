import {
  BottomNavigation,
  BottomNavigationAction,
  BoxProps,
  Paper,
  styled,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { dashPanelMenuList } from "../../util/constants";

const StyledPaper = styled(Paper)({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  borderRadius: "10px 10px 0 0",
  padding: "0.5rem 0",
});

export default function BottomPanel({
  display,
  selected,
  setSelected,
}: BoxProps & {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) {
  return (
    <StyledPaper sx={{ display }} elevation={3}>
      <BottomNavigation
        showLabels
        value={selected}
        sx={{
          backgroundImage: "inherit",
          borderRadius: "inherit",
        }}
        onChange={(event, newValue) => {
          setSelected(newValue);
        }}
      >
        {dashPanelMenuList.map((item) => (
          <BottomNavigationAction
            key={item.title}
            label={item.title}
            sx={{ borderRadius: "999px" }}
            icon={<item.Icon fontSize="medium" />}
          />
        ))}
      </BottomNavigation>
    </StyledPaper>
  );
}
