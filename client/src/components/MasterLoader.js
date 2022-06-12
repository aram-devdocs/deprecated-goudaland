import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: "100%", height: "100%", backgroundColor: "black" }}>
      <LinearProgress />
    </Box>
  );
}
