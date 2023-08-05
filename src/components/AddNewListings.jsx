import { useTheme } from "@emotion/react";
import { PhotoCamera } from "@mui/icons-material";
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
import React, { useState } from "react";

export default function AddNewListings() {
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const getImageHeight = () => {
    return isSmScreen ? 150 : 230;
  };

  return (
    <React.Fragment>
      <h1>Add New Listings</h1>
      <Box sx={{ pt: 5 }}>
        <form noValidate>
          <Stack spacing={2} sx={{ width: { sm: 400 } }}>
            <TextField label="Book Name" type="text" />
            <TextField label="Author Name" type="text" />
            <TextField label="ISBN No" type="text" />
            <TextField label="Price of the book" type="text" />
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
            <Button
              variant="contained"
              color="secondary"
            >
              Publish
            </Button>
          </Stack>
        </form>
      </Box>
    </React.Fragment>
  );
}
