import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, uploadBytes } from "firebase/storage";
import { useTheme } from "@emotion/react";
import { PhotoCamera } from "@mui/icons-material";
import { db, storage } from "../server/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";

export default function AddNewListings() {
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [bookImage, setBookImage] = useState(null);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentUser } = useAuth();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setBookImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const getImageHeight = () => {
    return isSmScreen ? 150 : 230;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    uploadBookImage();
    addBook();
  };

  const addBook = async () => {
    try {
      const docRef = await addDoc(collection(db, "Books"), {
        bookName: bookName,
        authorName: authorName,
        isbnNumber: isbnNumber,
        bookPrice: bookPrice,
        bookCategory: category,
        bookImageName: bookImage.name,
        postBy: currentUser.uid,
        bookLikeCount: 0,
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("Book Added Successfully!", {
        onOpen: () => {
          setBookName("");
          setAuthorName("");
          setIsbnNumber("");
          setBookPrice("");
          setCategory("");
          setImageUrl("");
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error(e.message);
    }
  };

  const uploadBookImage = () => {
    if (bookImage == null) return;
    const imageRef = ref(
      storage,
      `bookImages/${bookImage.name + "_" + currentUser.uid}`
    );
    toast.warning("Book Image start Uploading...");
    uploadBytes(imageRef, bookImage)
      .then(() => {
        toast.success("Book Image Uploaded!");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <React.Fragment>
      <h1>Add New Listings</h1>
      <Box sx={{ pt: 5 }}>
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} sx={{ width: { sm: 400 } }}>
            <TextField
              label="Book Name"
              type="text"
              name="bookName"
              value={bookName}
              onChange={(event) => setBookName(event.target.value)}
            />
            <TextField
              label="Author Name"
              type="text"
              name="authorNme"
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
            />
            <TextField
              label="ISBN No"
              type="text"
              name="isbnNum"
              value={isbnNumber}
              onChange={(event) => setIsbnNumber(event.target.value)}
            />
            <TextField
              label="Price of the book"
              type="text"
              name="bookPrice"
              value={bookPrice}
              onChange={(event) => setBookPrice(event.target.value)}
            />
            <FormControl>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                label="Category"
                value={category}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Twenty</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <InputLabel>Upload Book Image</InputLabel>
              <label htmlFor="upload-image">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    id="upload-image"
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <PhotoCamera fontSize="large" />
                </IconButton>
              </label>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="userUploadImage"
                  height={getImageHeight()}
                />
              )}
            </Box>
            <Button variant="contained" color="secondary" type="submit">
              Publish
            </Button>
          </Stack>
        </form>
      </Box>
    </React.Fragment>
  );
}
