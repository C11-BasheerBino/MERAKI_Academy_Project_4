import React, { useContext, useState } from "react";
import axios from "axios"
import {  useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import {Button,TextField,Link,ThemeProvider,Container} from '@mui/material/';

const Login = () => {
  const navigate= useNavigate()
  const user = useContext(UserContext)

  const [loginMsg, setLoginMsg] = useState(false);

  const [userLogging, setUserLogging] = useState({});
  const login = () => {
    
    axios
    .post("http://localhost:5000/users/login", userLogging)
    .then((result) => {
console.log(result.data.role.role);

if(result.data.role.role==='ADMIN'){
user.setWhoIsLoggedIn("ADMIN")
  navigate("/admin/provider_Update")
}else{
  localStorage.setItem("token", result.data.token);
  user.setToken(result.data.token);
  
  localStorage.setItem("loggingId", result.data.userId);
  user.setLoggingId(result.data.userId)
  
  localStorage.setItem("loggedInRole", 'user');
  user.setWhoIsLoggedIn("user")
  
  navigate("/users/dashbord")
}})
      
      .catch((err) => {
      
      });  

    }

  return (
    <Container component="main" maxWidth="xs" sx={{backgroundColor:"#e0e0e0",marginTop:"50px",  borderRadius: "12px"}} >
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
          setUserLogging({ email: e.target.value });
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
          setUserLogging({ ...userLogging, password: e.target.value });
        }}
      />
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} onClick={login}>Login</Button>
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} onClick={ ()=>{navigate("/providers/login")}} >Login as Provider</Button>
              <Link href="./register" variant="body2">
                  {" don't have an account ? Register here "}
                </Link>
    </Container>
  );
};

export default Login;
