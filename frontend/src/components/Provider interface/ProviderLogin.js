import React, { useContext, useState } from "react";
import axios from "axios"
const LoginAsProvider = () => {
  const [loginMsg, setLoginMsg] = useState(false);

  const [providerLogging, setProviderLogging] = useState({});
  const ProviderLogin = () => {
    axios
    .post("http://localhost:5000/providers/login", providerLogging)
    .then((result) => {
setLoginMsg(result.data.message)
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
      
      <div>don't have an account ?  <a href="register">Register here</a></div>
      {loginMsg && <div>{loginMsg}</div>}
    </div>
  );
};

export default LoginAsProvider;
