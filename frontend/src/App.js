import React, { createContext, useState } from "react";
import "./App.css";
import Login from "./components/User interface/Login";
import Register from "./components/User interface/Register";
import Dashbord from "./components/Provider interface/dashbord";
import Services from "./components/Provider interface/MyServices";
import AddService from "./components/Provider interface/AddNewServices";
import ProviderRegister from "./components/Provider interface/ProviderRegister";
import LoginAsProvider from "./components/Provider interface/ProviderLogin";
import Fields from "./components/User interface/Fields";
import ServicesOfField from "./components/User interface/ServicesOfField";

import { Route, Routes } from "react-router-dom";
import Navigation from "./components/shared components/Navbar";
import ProviderRequest from "./components/Admin_dashbbord/ProviderRequests";

export const UserContext = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loggingId, setLoggingId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[whoIsLoggedIn,setWhoIsLoggedIn]=useState('')
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <UserContext.Provider
        value={{
          token,
          setToken,
          isLoggedIn,
          setIsLoggedIn,
          loggingId,
          setLoggingId,
          whoIsLoggedIn,setWhoIsLoggedIn
        }}
      >
        <Navigation />
        <Routes>
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/providers/login" element={<LoginAsProvider />} />
          <Route path="/providers/register" element={<ProviderRegister />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/providers/services" element={<Services />} />
          <Route path="/providers/add_new_service" element={<AddService/>} />
          <Route path="/fields/*" element={<Fields/>}/>
          <Route path="/admin/provider_requests" element={<ProviderRequest/>}/>

        </Routes>

        <div>test</div>
        
        <div>test01</div>

      </UserContext.Provider>
    </div>
  );
};

export default App;
