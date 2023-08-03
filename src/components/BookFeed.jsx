import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Checkbox } from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbUpOffAlt,
} from "@mui/icons-material";



export default function BookFeed() {

  return (
    <Card sx={{ maxWidth: 545 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            M
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Mahinda Rajapaksha"
        subheader="September 14, 2023"
      />
      <CardMedia
        component="img"
        image="https://assets.brightspot.abebooks.a2z.com/dims4/default/2a2441b/2147483647/strip/true/crop/360x420+0+0/resize/360x420!/format/jpg/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.amazonaws.com%2Fa1%2F15%2F406b12f246809bf0983b228e154b%2Fharry.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body" color="text.secondary">
          Harry Potter - J.K. Rowling
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        <Box sx={{display:"flex", alignItems:"center", mr:3}}>
          <Checkbox icon={<ThumbUpOffAlt />} checkedIcon={<ThumbUp />} />
          <p>50</p>
        </Box>
        <Button variant="outlined" color="secondary">
          Read More...
        </Button>
      </CardActions>
    </Card>
  );
}
