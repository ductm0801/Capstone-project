import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../images/Login_image.png";
import "../styles/Login.css";
import logo from "../images/Logo.png";
import axios from "axios";
const baseURL = "https://localhost:7208/api/User/Login";
const Login = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginApi = (username, password) => {
    return axios.post(baseURL, {
      username: username,
      password: password,
    });
  };
  const handleSubmit = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    let res = await loginApi(username, password);

    if (res && res.data && res.data.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="login-content">
        <div className="loginImage">
          <img src={loginImage} alt="logo"></img>
        </div>
        <div className="inputForm">
          <div className="loginLogo">
            <img src={logo} alt="logo"></img>
          </div>
          <div>
            <div style={{ paddingBottom: "8px", marginLeft: "12px" }}>
              Username
            </div>
            <input
              className="loginInput"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <div style={{ paddingBottom: "8px", marginLeft: "12px" }}>
              Password
            </div>
            <input
              className="loginInput"
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div style={{ marginLeft: "12px" }}>
              <span style={{ fontWeight: "semi-bold", paddingTop: "20px" }}>
                Not Registed?
              </span>
              <span style={{ color: "#033987" }}>
                <Link to="/register"> Create an account</Link>
              </span>
            </div>

            <div>
              <button
                className="login-btn"
                type="submit"
                onClick={() => handleSubmit()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
