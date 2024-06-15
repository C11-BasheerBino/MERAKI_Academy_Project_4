import React,{useState} from "react";
import axios from "axios";


const ProviderRegister =()=>{
    const [registerMsg, setRegisterMsg] = useState("");
    const [provider, setProvider] = useState({
        firstName: "",
        lastName: "",
        age: 18,
        country: "",
        email: "",
        password: "",
        phoneNumber:'',
        location:'',
        workField:"",
        experince:1,
      });
      const providerRegisterInServer = () => {
        axios
          .post("http://localhost:5000/providers/register", provider)
          .then((result) => {
            console.log(result.data.message);
            setRegisterMsg(result.data.message);
            console.log(registerMsg)

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
            setProvider({ ...provider, firstName: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="last Name"
          onChange={(e) => {
            setProvider({ ...provider, lastName: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(e) => {
            setProvider({ ...provider, age: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Country"
          onChange={(e) => {
            setProvider({ ...provider, country: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setProvider({ ...provider, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setProvider({ ...provider, password: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="PhoneNumber"
          onChange={(e) => {
            setProvider({ ...provider, phoneNumber: e.target.value });
          }}  />
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => {
            setProvider({ ...provider, location: e.target.value });
          }}/>
          <input
          type="text"
          placeholder="You work field"
          onChange={(e) => {
            setProvider({ ...provider, workField: e.target.value });
          }}/>
          <input
          type="number"
          placeholder="experince"
          onChange={(e) => {
            setProvider({ ...provider, experince: e.target.value });
          }}/>
        <button onClick={providerRegisterInServer}>Register</button>
        {registerMsg && (registerMsg !== "The email already exists" ? (
            <div style={{ backgroundColor: "green", fontWeight: "bold" }}>
              Account Created Successfully , your request on pennding
            </div>
          ) : (
            <div style={{ backgroundColor: "red", fontWeight: "bold" }}>
              The email already exists
            </div>
          ))}
        
      </div>
    )
}






            export default ProviderRegister