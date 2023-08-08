import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../server/firebase";
import {
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function MyListings() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [books, setBooks] = useState([]);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "bookImages/");
  const { currentUser } = useAuth();

  useEffect(() => {
    getBookData();
    getAllImage();
  }, []);

  const getAllImage = () => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  };

  const getBookData = async () => {
    const querySnapshot = await getDocs(collection(db, "Books"));
    const booksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(booksData);
  };

  return (
    <React.Fragment>
      {books.map((book) => {
        if (book.postBy === currentUser.uid) {
          return (
            <Card
              key={book.id}
              sx={{
                display: "flex",
                width: { sm: 850 },
                flexDirection: isSmallScreen ? "column" : "row",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { sm: 300 } }}
                image={
                  imageList.filter((url) =>
                    url.includes(
                      `${book.bookImageName + "_" + currentUser.uid}`
                    )
                  )[0]
                }
                alt="Book Cover"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {book.bookName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {book.authorName}
                    <br />
                    ISBN Number: {book.isbnNumber}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "inline-block",
                        backgroundColor: book.bookAvailable
                          ? "#4CAF50"
                          : "#FF5722", // Green for available, Red for unavailable
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {book.bookAvailable ? "Available" : "Unavailable"}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      sx={{
                        marginLeft: "60px",
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          );
        } else {
          return null; // If the condition is not met, don't render anything
        }
      })}
    </React.Fragment>
  );
}
