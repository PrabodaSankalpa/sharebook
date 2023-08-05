import React from "react";
import {
  Box,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Stack,

} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <React.Fragment>
  <Box  sx={{marginBottom:3}}>
    <form noValidate>
      <Stack spacing={2} sx={{ width: { sm: 400 } }}>
        <Box position="sticky" sx={{ display: "flex" ,justifyContent:"center"}}>
          <SearchIcon fontSize="large" />
          <TextField
            id="outlined-basic"
            label="Search Book"
            variant="outlined"
            size="small"
            InputProps={{
              style: {
                borderRadius: "50px",
               
              },
            }}
          />
          <FormControl size="small" sx={{width:"100px"}} >
            <InputLabel id="demo-simple-select-label" >Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Category"
              onChange={handleChange}
              sx={{borderRadius:50}}
              
            >
              <MenuItem value={10}>Romance</MenuItem>
              <MenuItem value={20}>Horror</MenuItem>
              <MenuItem value={30}>Novels</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </form>
  </Box>
</React.Fragment>
  );
}
