import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import logo from "../images/menu_logo.png";
import "../styles/header.css";
import { Link, useLocation } from "react-router-dom";
import DropdownProfile from "./DropDownProfile";
import Avatar from "../images/Avatar.png";

const Header = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setUserRole(role);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, []);

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", changeBackground);
      return () => {
        window.removeEventListener("scroll", changeBackground);
      };
    } else {
      setNavbar(true);
    }
  }, [location.pathname]);

  return (
    <div className={navbar ? "navbar active" : "navbar"}>
      <ul>
        {userRole === "Manager" && (
          <div className="navbar-content">
            <img className="logo" src={logo} alt="" />
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/manager">Create Tournament</Link>
            </li>
            <li>
              <Link to="/manager">Find Tournament</Link>
            </li>
            <img
              className="avatar"
              onClick={() => setOpenProfile((prev) => !prev)}
              src={Avatar}
              alt=""
            />
            {openProfile && <DropdownProfile />}
          </div>
        )}
        {userRole === "Athletes" && (
          <div className="navbar-content">
            <img className="logo" src={logo} alt="" />
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/manager">Find Tournament</Link>
            </li>
            <img
              className="avatar"
              onClick={() => setOpenProfile((prev) => !prev)}
              src={Avatar}
              alt=""
            />
            {openProfile && <DropdownProfile />}
          </div>
        )}
        {!userRole && (
          <div className="navbar-content">
            <img className="logo" src={logo} alt="" />
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/findTournament">Find Tournament</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <button className="header-btn">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Header;
