import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import React from "react";

export default function ImageContainer({
  children,
  cols,
}: {
  children?: React.ReactNode;
  cols: number;
}) {
  return (
    <Box sx={{ width: "100%", overflowY: "none" }}>
      {children ? (
        <ImageList variant="masonry" cols={cols} gap={10}>
          {children}
        </ImageList>
      ) : null}
    </Box>
  );
}
