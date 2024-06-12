import React from 'react'
import "./App.css";
import Login from './components/User interface/Login';
import Register from "./components/User interface/Register"
const App = () => {
  return (
   <div className="App">
      <h1>Hello World!</h1>
      <Login/>
      <Register/>
    </div>
  )
}

export default App
