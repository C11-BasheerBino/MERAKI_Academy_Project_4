import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Navigation = () => {
  const userStatus = useContext(UserContext);

  const logout = () => {
    localStorage.setItem("token", null);
    userStatus.setToken(null);
    userStatus.setIsLoggedIn(false);
    userStatus.setWhoIsLoggedIn(false);
  };
  return (
    // inline styling in react
    <div style={{ display: "flex", gap: "30px" }}>
      {/* link acts like an `a` tag, it will switch the navigate to the route provided in the `to` prop */}
      {userStatus.whoIsLoggedIn === "provider" && (
        <div>
          <Link to="/dashbord"> Dashbord </Link>
          <Link to="/providers/services"> Providerservices </Link>
          <Link to="/providers/add_new_service"> add new service </Link>
          <Link to="/providers/login" onClick={logout}>
            {" "}
            Logout
          </Link>
        </div>
      )}

{userStatus.whoIsLoggedIn === "user" && userStatus.whoIsLoggedIn !=="provider" &&(
        <div>
         <Link to="/users/dashbord">Dashbord</Link>
         <Link to="/fields">Fields</Link>
         
          <Link to="/users/login" onClick={logout}>
            {" "}
            Logout
          </Link>
        </div>)
      }
      
     
      

      
    </div>
  );
};

export default Navigation;
