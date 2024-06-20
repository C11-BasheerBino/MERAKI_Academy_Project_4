import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";


const Navigation = () => {
  const userStatus = useContext(UserContext);

  const logout = () => {
    localStorage.setItem("token", null);
    userStatus.setToken(null);
    userStatus.setIsLoggedIn(false);
    userStatus.setWhoIsLoggedIn(false)
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
          <Link to="/users/login" onClick={logout}> Logout</Link>
        </div>
      )}
          <Link to="/users/login"> Login </Link>
          <Link to="/fields">Fields</Link>

      {userStatus.whoIsLoggedIn === "user" && (
        <div>
          <Link to="/users/login"> Login </Link>
        </div>
      ) }
    </div>
  );
};

export default Navigation;
