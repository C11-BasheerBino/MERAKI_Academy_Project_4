import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Container } from "@mui/material/";

const Register = () => {
  const [registerMsg, setRegisterMsg] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: 18,
    country: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
  });
  const userRegisterInServer = () => {
    axios
      .post("http://localhost:5000/users/register", user)
      .then((result) => {
        console.log(result.data.message);
        setRegisterMsg(result.data.message);
      })
      .catch((err) => {
        setRegisterMsg(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="First Name"
        autoFocus
        onChange={(e) => {
          setUser({ ...user, firstName: e.target.value });
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="Last Name"
        autoFocus
        onChange={(e) => {
          setUser({ ...user, lastName: e.target.value });
        }}
      />
      <TextField
        id="outlined-number"
        label="Age"
        type="number"
        onChange={(e) => {
          setUser({ ...user, age: e.target.value });
        }}
      />
      <TextField
        margin="normal"
        required
        id="Country"
        label="Country"
        name="Country"
        autoFocus
        onChange={(e) => {
          setUser({ ...user, country: e.target.value });
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <TextField
        margin="normal"
        required
        id="PhoneNumber"
        label="PhoneNumber"
        name="PhoneNumber"
        autoFocus
        onChange={(e) => {
          setUser({ ...user, phoneNumber: e.target.value });
        }}
      />
      <TextField
        margin="normal"
        required
        id="Location"
        label="Location"
        name="Location"
        autoFocus
        onChange={(e) => {
          setUser({ ...user, location: e.target.value });
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={userRegisterInServer}
      >
        Register
      </Button>
      {registerMsg &&
        (registerMsg === "user added Successfully" ? (
          <div style={{ backgroundColor: "green", fontWeight: "bold" }}>
            Account Created Successfully
          </div>
        ) : (
          <div style={{ backgroundColor: "red", fontWeight: "bold" }}>
            The email already exists
          </div>
        ))}
    </Container>
  );
};

export default Register;
