import { Box } from "@mui/material";
import React from "react";
import AddNewListings from "./AddNewListings";
import BookFeed from "./BookFeed";
import MyListings from "./MyListings";

export default function ContentArea(props) {
  return (
    <Box sx={{ padding: 2 }}>
      {props.selectedMenu === "BookFeed" ? (
        <BookFeed />
      ) : props.selectedMenu === "Favorites" ? (
        <BookFeed />
      ) : props.selectedMenu === "AddNewListings" ? (
        <AddNewListings />
      ) : props.selectedMenu === "MyListings" ? (
        <MyListings />
      ) : props.selectedMenu === "BorrowReq" ? (
        <BookFeed />
      ) : props.selectedMenu === "UserDetails" ? (
        <BookFeed />
      ) : (
        <BookFeed />
      )}
    </Box>
  );
}
