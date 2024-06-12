import React,{useState} from "react";
import axios from "axios";

const Register =()=>{
    const [registerMsg, setRegisterMsg] = useState("");
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        age: 18,
        country: "",
        email: "",
        password: "",
        phoneNumber:'',
        location:'',
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
        <div>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setUser({ ...user, firstName: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="last Name"
          onChange={(e) => {
            setUser({ ...user, lastName: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(e) => {
            setUser({ ...user, age: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Country"
          onChange={(e) => {
            setUser({ ...user, country: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="PhoneNumber"
          onChange={(e) => {
            setUser({ ...user, phoneNumber: e.target.value });
          }}  />
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => {
            setUser({ ...user, location: e.target.value });
          }}/>
        <button onClick={userRegisterInServer}>Register</button>
        {registerMsg && (registerMsg === "user added Successfully" ? (
            <div style={{ backgroundColor: "green", fontWeight: "bold" }}>
              Account Created Successfully
            </div>
          ) : (
            <div style={{ backgroundColor: "red", fontWeight: "bold" }}>
              The email already exists
            </div>
          ))}
        
      </div>
    )
}






            export default Register