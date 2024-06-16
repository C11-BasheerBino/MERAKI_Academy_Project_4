import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Navigation = () => {
    const userStatus=useContext(UserContext)
        
      const logout = () => {
        localStorage.setItem("token", null);
        userStatus.setToken(null);
        userStatus.setIsLoggedIn(false);
      };
      return (
        // inline styling in react
        <div style={{ display: "flex", gap: "20px" }}>
          {/* link acts like an `a` tag, it will switch the navigate to the route provided in the `to` prop */}
          {!userStatus.token ? (
            <div>
              <Link to="/users/register"> Register </Link>
              <Link to="/users/login"> Login </Link>
              <Link to="/providers/login"> Login Provider </Link>
              <Link to="/providers/register"> register provider </Link>
              

            </div>
          ) : (
            <div>
             <Link to="/dashbord"> Dashbord </Link>
              <Link to="/providers/services"> Providerservices </Link>
              <Link to="/providers/add_new_service"> add new service </Link>
              <Link to="/users/login" onClick={logout}>Logout</Link>
            </div>
          )}
        </div>
      );
    };

    export default Navigation