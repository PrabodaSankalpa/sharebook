import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ContentArea from "./components/ContentArea";
import { AppBar, Box, Stack, Toolbar } from "@mui/material";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("BookFeed");
  function handleDisplayBookFeed() {
    setSelectedMenu("BookFeed");
  }
  function handleDisplayFavorites() {
    setSelectedMenu("Favorites");
  }
  function handleDisplayAddNewListings() {
    setSelectedMenu("AddNewListings");
  }
  function handleDisplayMyListings() {
    setSelectedMenu("MyListings");
  }
  function handleDisplayBorrowReq() {
    setSelectedMenu("BorrowReq");
  }
  function handleDisplayUserDetails() {
    setSelectedMenu("UserDetails");
  }
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>{/* Add your content here */}</Toolbar>
      </AppBar>
      <Box>
        <Stack direction="row" justifyContent="center">
          <Sidebar
            onDisplayBookFeed={handleDisplayBookFeed}
            onDisplayFavorites={handleDisplayFavorites}
            onDisplayAddNewListings={handleDisplayAddNewListings}
            onDisplayMyListings={handleDisplayMyListings}
            onDisplayBorrowReq={handleDisplayBorrowReq}
            onDisplayUserDetails={handleDisplayUserDetails}
          />
          <ContentArea selectedMenu={selectedMenu} />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
