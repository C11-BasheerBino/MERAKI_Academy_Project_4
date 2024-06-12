import React from 'react'
import "./App.css";
import Login from './components/User interface/Login';
import Register from "./components/User interface/Register"
import Dashbord from './components/Provider interface/dashbord';
import Services from './components/Provider interface/MyServices';
const App = () => {
  return (
   <div className="App">
      <h1>Hello World!</h1>
      <Login/>
      <Register/>
      <Dashbord/>
      <Services/>
    </div>
  )
}

export default App
