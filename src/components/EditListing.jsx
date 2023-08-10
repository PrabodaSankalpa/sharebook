import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, uploadBytes } from "firebase/storage";
import { useTheme } from "@emotion/react";
import { PhotoCamera } from "@mui/icons-material";
import { db, storage } from "../server/firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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
  Switch,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Appbar from "./Appbar";
import { useParams, useNavigate } from "react-router-dom";

export default function AddNewListings(match) {
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [bookImage, setBookImage] = useState(null);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookAvil, setBookAvil] = useState(null);
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  //   const handleFileUpload = (event) => {
  //     const file = event.target.files[0];
  //     setBookImage(file);
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setImageUrl(reader.result);
  //     };

  //     reader.readAsDataURL(file);
  //   };

  //   const getImageHeight = () => {
  //     return isSmScreen ? 150 : 230;
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBook();
    // uploadBookImage();
  };

  const updateBook = () => {
    const bookRef = doc(db, "Books", id);
    updateDoc(bookRef, {
      bookName: bookName,
      authorName: authorName,
      isbnNumber: isbnNumber,
      bookPrice: bookPrice,
      bookCategory: category,
      bookAvailable: bookAvil,
    })
      .then((response) => {
        toast.success(
          "Updated Successful! You will redirect to the book feed",
          {
            onClose: () => navigate("/home"),
          }
        );
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  };
  //   const uploadBookImage = () => {
  //     if (bookImage == null) return;
  //     const imageRef = ref(
  //       storage,
  //       `bookImages/${bookImage.name + "_" + currentUser.uid}`
  //     );
  //     toast.warning("Book Image start Uploading...");
  //     uploadBytes(imageRef, bookImage)
  //       .then(() => {
  //         toast.success("Book Image Uploaded!");
  //       })
  //       .catch((e) => {
  //         toast.error(e.message);
  //       });
  //   };

  useEffect(() => {
    getBookDetails();
  }, []);

  const getBookDetails = async () => {
    const docRef = doc(db, "Books", id);
    const docSnap = await getDoc(docRef);
    const bookData = docSnap.data();
    if (docSnap.exists()) {
      setBookName(bookData.bookName);
      setAuthorName(bookData.authorName);
      setIsbnNumber(bookData.isbnNumber);
      setBookPrice(bookData.bookPrice);
      setCategory(bookData.bookCategory);
      setBookAvil(bookData.bookAvailable);
    } else {
      console.log("No such document!");
      toast.warning("Please, Add rest of the user data!");
    }
  };

  const handleDelete = () => {
    alert("Delete");
  };

  return (
    <React.Fragment>
      <Appbar />
      <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
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
              <InputLabel>Availability</InputLabel>
              <Switch
                checked={bookAvil}
                onChange={(event) => setBookAvil(event.target.checked)}
              />
            </Box>
            {/* <Box>
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
            </Box> */}
            <Button variant="contained" color="secondary" type="submit">
              Update
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </form>
      </Box>
    </React.Fragment>
  );
}
