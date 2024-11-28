import { useTheme, useMediaQuery } from "@mui/material";

const useColNums = () => {
  const theme = useTheme();
  const screenSize = {
    isSmall: useMediaQuery(theme.breakpoints.down("md")),
    isMedium: useMediaQuery(theme.breakpoints.between("md", "xl")),
    isLarge: useMediaQuery(theme.breakpoints.up("xl")),
  };

  const cols = screenSize.isLarge ? 4 : screenSize.isMedium ? 3 : 2;

  return cols;
};

export default useColNums;
