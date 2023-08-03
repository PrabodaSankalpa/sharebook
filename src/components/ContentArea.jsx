import { Box } from "@mui/material";
import React from "react";
import BookFeed from "./BookFeed";

export default function ContentArea() {
  return (
    <Box sx={{padding: 2}}>
      <BookFeed />
    </Box>
  );
}
