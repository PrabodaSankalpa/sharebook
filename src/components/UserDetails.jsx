import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { db } from "../server/firebase";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function UserDetails() {
  const [address01, setAddress01] = useState("");
  const [address02, setAddress02] = useState("");
  const [address03, setAddress03] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nic, setNic] = useState("");
  const { currentUser } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser();
  };

  useEffect(() => {
    getUserData();
  },[]);

  const getUserData = async () => {
    const docRef = doc(db, "usersData", currentUser.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    if (docSnap.exists()) {
      setAddress01(userData.address01);
      setAddress02(userData.address02);
      setAddress03(userData.address03);
      setPostalCode(userData.postalCode);
      setPhoneNumber(userData.phoneNumber);
      setNic(userData.nic);
    } else {
      console.log("No such document!");
      toast.warning("Please, Add rest of the user data!");
    }
  };

  const updateUser = async () => {
    try {
      await setDoc(doc(db, "usersData", currentUser.uid), {
        address01: address01,
        address02: address02,
        address03: address03,
        postalCode: postalCode,
        phoneNumber: phoneNumber,
        nic: nic,
      });
      toast.success("Updated User Information!");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ pt: 5 }}>
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} sx={{ width: { sm: 400 } }}>
            <TextField
              label="Address Line 1"
              type="text"
              name="address01"
              value={address01}
              onChange={(event) => setAddress01(event.target.value)}
            />
            <TextField
              label="Address Line 2"
              type="text"
              name="address02"
              value={address02}
              onChange={(event) => setAddress02(event.target.value)}
            />
            <TextField
              label="Address Line 3"
              type="text"
              name="address03"
              value={address03}
              onChange={(event) => setAddress03(event.target.value)}
            />
            <TextField
              label="Postal Code"
              type="text"
              name="postalCode"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
            />
            <Box sx={{ display: "flex" }}>
              <TextField
                label="Phone Number"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <TextField
                label="NIC Number"
                type="text"
                name="nic"
                value={nic}
                onChange={(event) => setNic(event.target.value)}
              />
            </Box>
            <Button color="secondary" variant="outlined" type="submit">
              Update
            </Button>
          </Stack>
        </form>
      </Box>
    </React.Fragment>
  );
}
