import { Box } from "@mui/material";
import React from "react";
import AddNewListings from "./AddNewListings";
import BookFeed from "./BookFeed";
import MyListings from "./MyListings";
import SearchBar from "./SearchBar";
import BorrowRequests from "./BorrowRequests";
import UserDetails from "./UserDetails";

export default function ContentArea(props) {
  return (
    <Box sx={{ padding: 2 }}>
      {props.selectedMenu === "BookFeed" ? (
        <Box>
          <SearchBar />
          <BookFeed />
        </Box>
      ) : props.selectedMenu === "Favorites" ? (
        <Box>
          <SearchBar />
          <BookFeed />
        </Box>
      ) : props.selectedMenu === "AddNewListings" ? (
        <AddNewListings />
      ) : props.selectedMenu === "MyListings" ? (
        <MyListings />
      ) : props.selectedMenu === "BorrowReq" ? (
        <BorrowRequests />
      ) : props.selectedMenu === "UserDetails" ? (
        <UserDetails />
      ) : (
        <BookFeed />
      )}
    </Box>
  );
}
