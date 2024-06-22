import React, { useContext, useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

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
user.setLoggingId(result.data.userId)
user.setWhoIsLoggedIn("user")

navigate("/users/dashbord")

    })
    .catch((err) => {
    
    });
  };
  return (
    <div style={{display:"flex",flexDirection:"column",width:"30%",gap:"10px",alignItems:"center"}}>
      <div>Login by entering your email address and password</div>

      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setUserLogging({ email: e.target.value });
        }}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setUserLogging({ ...userLogging, password: e.target.value });
        }}
      />
      <button onClick={login}>Login</button>
      <button ><Link to="/providers/login" >Login as Provider</Link></button>
      <div>don't have an account ?  <a href="./register">Register here</a></div>
    </div>
  );
};

export default Login;
