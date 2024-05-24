import React, { Component } from "react";
import { Link } from "react-router-dom";
import loginImage from "../images/Login_image.png";
import "../styles/Login.css";
import logo from "../images/Logo.png";
const login = () => {
  return (
    <div className="container">
      <div className="login-content">
        <div className="loginImage">
          <img src={loginImage}></img>
        </div>
        <div className="inputForm">
          <div className="loginLogo">
            <img src={logo}></img>
          </div>

          <div style={{ paddingBottom: "8px" }}>Username</div>
          <input
            className="loginInput"
            id="username"
            type="text"
            placeholder="Username"
          ></input>
          <div style={{ paddingBottom: "8px" }}>Password</div>
          <input
            className="loginInput"
            id="password"
            type="password"
            placeholder="password"
          ></input>
          <div>
            <span style={{ fontWeight: "semi-bold", paddingTop: "20px" }}>
              Not Registed?
            </span>
            <span style={{ color: "#033987" }}>
              <Link to="/register"> Create an account</Link>
            </span>
          </div>

          <div>
            <button className="login-btn" type="submit">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default login;
