import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../images/Login_image.png";
import "../styles/Login.css";
import logo from "../images/Logo.png";
import axios from "axios";
import { toast } from "react-toastify";
const baseURL = "http://localhost:5000/api/User/Login";
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginApi = (username, password) => {
    return axios.post(baseURL, {
      userName: username,
      password: password,
    });
  };
  const handleSubmit = async () => {
    if (!username || !password) {
      toast.error("Wrong username or password!");
      return;
    }
    let res = await loginApi(username, password);

    if (res) {
      localStorage.setItem("token", res.data);
      toast.success("Login successful!");
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
