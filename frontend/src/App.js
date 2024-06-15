import React from 'react'
import "./App.css";
import Login from './components/User interface/Login';
import Register from "./components/User interface/Register"
import Dashbord from './components/Provider interface/dashbord';
import Services from './components/Provider interface/MyServices';
import AddService from './components/Provider interface/AddNewServices';
import ProviderRegister from "./components/Provider interface/ProviderRegister"
const App = () => {
  return (
   <div className="App">
      <h1>Hello World!</h1>
      <Login/>
      <Register/>
      <Dashbord/>
      <Services/>
      <AddService/>
      <ProviderRegister/>
    </div>
  )
}

export default App
