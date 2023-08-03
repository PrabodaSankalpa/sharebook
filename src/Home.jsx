import React from "react";
import Sidebar from "./components/Sidebar";
import ContentArea from "./components/ContentArea";
import { AppBar, Box, Stack, Toolbar } from "@mui/material";

export default function Home() {
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          {/* Add your content here */}
        </Toolbar>
      </AppBar>
      <Box>
        <Stack direction="row" justifyContent="center">
          <Sidebar />
          <ContentArea />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
