import React, { useContext, useState } from "react";
import axios from "axios"
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";


const LoginAsProvider = () => {
  const navigate=useNavigate()
  const user = useContext(UserContext)
  const [loginMsg, setLoginMsg] = useState(false);

  const [providerLogging, setProviderLogging] = useState({});
  const ProviderLogin = () => {
    axios
    .post("http://localhost:5000/providers/login", providerLogging)
    .then((result) => {
      console.log("from provider Login",result.data);
setLoginMsg(result.data.message)
user.setToken(result.data.token)
user.setLoggingId(result.data.providerId
)
console.log("hello from provider login",user.loggingId);
user.setWhoIsLoggedIn("provider")
navigate("/dashbord")

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
            setProviderLogging({ email: e.target.value });
        }}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
            setProviderLogging({ ...providerLogging, password: e.target.value });
        }}
      />
      <button onClick={ProviderLogin}>Login</button>
      
      <div>Start your Maintence career  <a href="./register">from here</a></div>
      {loginMsg && <div>{loginMsg}</div>}
    </div>
  );
};

export default LoginAsProvider;
