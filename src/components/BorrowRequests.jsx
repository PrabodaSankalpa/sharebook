import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

export default function BorrowRequests() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Card
      sx={{
        display: "flex",
        width: { sm: 850 },
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: { sm: 300 } }}
        image="https://www.thesun.co.uk/wp-content/uploads/2023/06/newspress-collage-22812384-1688037772318.jpg?w=620"
        alt="Live from space album cover"
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
                The Book Name You Share
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Name of the requested Person
            <br />
            Place
            <br />
            Location 
            <br/>
            Time 

          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
           
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              
            >
              View More 
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
