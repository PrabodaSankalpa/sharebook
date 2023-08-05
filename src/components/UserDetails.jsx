import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

export default function UserDetails() {
  return (
    <React.Fragment>
      <Box sx={{ pt: 5 }}>
        <form noValidate>
          <Stack spacing={2} sx={{ width: { sm: 400 } }}>
            <TextField
              id="outlined-basic"
              label="Address Line 1"
              variant="outlined"
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Address Line 2"
              variant="outlined"
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Address Line 3"
              variant="outlined"
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Postal Code"
              variant="outlined"
              size="small"
            />
            <Box sx={{display:"flex"}}>
              <TextField
                id="outlined-basic"
                label="Phone NUmber"
                variant="outlined"
                size="small"
              />
              <TextField
               margin="0 0 0 5px"
                id="outlined-basic"
                label="NIC Number"
                variant="outlined"
                size="small"
              />
            </Box>
            <Button sx={{borderRadius:10}} variant="outlined">Submit</Button>
          </Stack>
        </form>
      </Box>
    </React.Fragment>
  );
}
