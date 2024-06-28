import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Container, Stack } from "@mui/material/";

const ProviderRegister = () => {
  const [registerMsg, setRegisterMsg] = useState("");
  const [provider, setProvider] = useState({
    firstName: "",
    lastName: "",
    age: 18,
    country: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
    workField: "",
    experince: 1,
  });
  const providerRegisterInServer = () => {
    axios
      .post("http://localhost:5000/providers/register", provider)
      .then((result) => {
        console.log(result.data.message);
        setRegisterMsg(result.data.message);
        console.log(registerMsg);
      })
      .catch((err) => {
        setRegisterMsg(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  return (
    <Container component="main" maxWidth="xs"  sx={{backgroundColor:"#e0e0e0",marginTop:"50px",  borderRadius: "12px"}}>
      <Stack direction="row"
          justifyContent="center"
          alignItems="center"
          >
      <TextField
      sx={{backgroundColor:"white"}}
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="First Name"
        autoFocus
        onChange={(e) => {
          setProvider({ ...provider, firstName: e.target.value });
        }}
      />
      <TextField
      sx={{backgroundColor:"white"}}
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="Last Name"
        autoFocus
        onChange={(e) => {
          setProvider({ ...provider, lastName: e.target.value });
        }}
      /></Stack>
      <Stack direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={3}><TextField
          sx={{backgroundColor:"white"}}
        id="outlined-number"
        label="Age"
        type="number"
        onChange={(e) => {
          setProvider({ ...provider, age: e.target.value });
        }}
      />
      <TextField
      sx={{backgroundColor:"white"}}
        margin="normal"
        required
        id="Country"
        label="Country"
        name="Country"
        autoFocus
        onChange={(e) => {
          setProvider({ ...provider, country: e.target.value });
        }}
      /></Stack>
      <TextField
      sx={{backgroundColor:"white"}}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => {
          setProvider({ ...provider, email: e.target.value });
        }}
      />
      <TextField
      sx={{backgroundColor:"white"}}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => {
          setProvider({ ...provider, password: e.target.value });
        }}
      />
      <Stack direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={3}><TextField
          sx={{backgroundColor:"white"}}
        margin="normal"
        required
        id="PhoneNumber"
        label="PhoneNumber"
        name="PhoneNumber"
        autoFocus
        onChange={(e) => {
          setProvider({ ...provider, phoneNumber: e.target.value });
        }}
      />
      <TextField
      sx={{backgroundColor:"white"}}
        margin="normal"
        required
        id="Location"
        label="Location"
        name="Location"
        autoFocus
        onChange={(e) => {
          setProvider({ ...provider, location: e.target.value });
        }}
      /></Stack>
      <Stack direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={3}>
      <TextField
      sx={{backgroundColor:"white"}}
        margin="normal"
        required
        id="You work field"
        label="You work field"
        name="You work field"
        autoFocus
        onChange={(e) => {
          setProvider({ ...provider, workField: e.target.value });
        }}
      />
      <TextField
      sx={{backgroundColor:"white"}}
        id="outlined-number"
        label="experince"
        type="number"
        onChange={(e) => {
          setProvider({ ...provider, experince: e.target.value });
        }}
      /></Stack>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={providerRegisterInServer}
      >
        Register
      </Button>
      {registerMsg &&
        (registerMsg !== "The email already exists" ? (
          <div style={{ backgroundColor: "green", fontWeight: "bold" }}>
            Account Created Successfully , your request on pennding
          </div>
        ) : (
          <div style={{ backgroundColor: "red", fontWeight: "bold" }}>
            The email already exists
          </div>
        ))}
    </Container>
  );
};

export default ProviderRegister;
