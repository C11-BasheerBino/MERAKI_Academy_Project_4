import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import logo from "./M_processed.jpg";
const Navigation = () => {
  const userStatus = useContext(UserContext);
  console.log("hello Nav");

  const logout = () => {
    localStorage.setItem("token", null);
    userStatus.setToken(null);
    userStatus.setIsLoggedIn(false);
    userStatus.setWhoIsLoggedIn(false);
    userStatus.setName(null)
    localStorage.setItem("name", null);


    localStorage.setItem("loggingId", null);
    userStatus.setLoggingId("");

    localStorage.setItem("loggedInRole", "");
    userStatus.setWhoIsLoggedIn("");
  };
  return (
    // inline styling in react
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "lightblue",
        }}
      >
        <Toolbar>
          {userStatus.whoIsLoggedIn !== "user" &&
            userStatus.whoIsLoggedIn !== "provider" && userStatus!=="admin" &&(
              <Box
                sx={{
                  backgroundColor: "lightblue",
                  flexDirection: "row",
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <Link to="/users/login">
                  <Box
                    component="img"
                    sx={{ height: 100 }}
                    alt="Logo"
                    src={logo}
                  />
                </Link>

                <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "black", textDecoration: "none", marginBottom:"none"
                }}
              >
                
                  MAINTAIN SOLUTIONS
           
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                <Link
                  to="/users/login"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Typography>
              </Box>
            )}

          {userStatus.whoIsLoggedIn === "provider" && (
            <Box
              sx={{
                backgroundColor: "lightblue",
                flexDirection: "row",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Link to="/dashbord">
                <Box
                  component="img"
                  sx={{ height: 100 }}
                  alt="Logo"
                  src={logo}
                />
              </Link>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                <Link
                  to="/dashbord"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Dashbord
                </Link>
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                <Link
                  to="/providers/services"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  {" "}
                  My Services{" "}
                </Link>
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                <Link
                  to="/providers/add_new_service"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  {" "}
                  Create New Service{" "}
                </Link>
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                <Link
                  to="/providers/login"
                  onClick={logout}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  {" "}
                  Logout{" "}
                </Link>
              </Typography>

              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "black", textDecoration: "none"
                }}
              >
                
                  Welcome,{userStatus.name}
                           </Typography>
            </Box>
          )}
          {userStatus.whoIsLoggedIn === "user" &&
            userStatus.whoIsLoggedIn !== "provider" && (
              <Box
                sx={{
                  backgroundColor: "lightblue",
                  flexDirection: "row",
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <Link to="/users/dashbord">
                  <Box
                    component="img"
                    sx={{ height: 100 }}
                    alt="Logo"
                    src={logo}
                  />
                </Link>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                  }}
                >
                  <Link
                    to="/users/dashbord"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Dashbord
                  </Link>
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                  }}
                >
                  <Link
                    to="/fields"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Fields
                  </Link>
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Link
                    to="/users/login"
                    onClick={logout}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {" "}
                    Logout
                  </Link>{" "}
                </Typography>
              </Box>
            )}
        </Toolbar>
      </AppBar>
      {/* link acts like an `a` tag, it will switch the navigate to the route provided in the `to` prop */}
    </div>
  );
};

export default Navigation;
