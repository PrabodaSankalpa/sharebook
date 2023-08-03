import React from "react";
import Appbar from "./components/Appbar";
import { useAuth } from "./context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import myTheme from "./theme/theme";

const imageStyles = {
  width: "100%",
  height: "auto",
  maxWidth: 600,
};

export default function Login() {
  const { signUp } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  async function handleSignUp() {
    try {
      await signUp();
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Appbar />
      <Box>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="center">
          <Box flex={1}>
            <img style={imageStyles} src="./assets/World PNG.png" alt="" />
          </Box>
          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Typography
              sx={{ color: myTheme.palette.primary.main }}
              variant={isXs ? "h4" : "h3"}
            >
              Read, Shrare, Repete, The book lover's mantra
            </Typography>
            <Typography variant="h5" component="h5">
              This is a Web Application to Share your books with others.
            </Typography>
            <Box mt={3}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<GoogleIcon />}
                size="large"
                onClick={handleSignUp}
              >
                Sign In with Google
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
