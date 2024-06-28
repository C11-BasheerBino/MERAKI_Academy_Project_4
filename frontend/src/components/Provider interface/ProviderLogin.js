import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import {Button,TextField,Link,ThemeProvider,Container} from '@mui/material/';


const LoginAsProvider = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [loginMsg, setLoginMsg] = useState(false);

  const [providerLogging, setProviderLogging] = useState({});
  const ProviderLogin = () => {
    axios
      .post("http://localhost:5000/providers/login", providerLogging)
      .then((result) => {
        console.log("from provider Login", result.data);
        localStorage.setItem("token", result.data.token);
        setLoginMsg(result.data.message);
        user.setToken(result.data.token);
        localStorage.setItem("loggingId", result.data.providerId);
        user.setLoggingId(result.data.providerId);
        console.log("hello from provider login", user.loggingId);


      
        localStorage.setItem("loggedInRole", 'provider');
        user.setWhoIsLoggedIn("provider");

        localStorage.setItem("name",result.data.name);
        user.setName(result.data.name);
        navigate("/dashbord");


      })
      .catch((err) => {});
  };
  return (
    
    
      <Container component="main" maxWidth="xs" sx={{backgroundColor:"#e0e0e0",marginTop:"50px",  borderRadius: "12px"}}>
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
          setProviderLogging({ email: e.target.value });
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
          setProviderLogging({ ...providerLogging, password: e.target.value });
        }}
      />
       <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} onClick={ProviderLogin}>Login</Button>
<Link href="./register" variant="body2">
                  {" Start your Maintence career from here"}
                </Link>

      {loginMsg && <div>{loginMsg}</div>}
    </Container>
    
  );
};

export default LoginAsProvider;
