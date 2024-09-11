import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../images/Login_image.png";
import "../styles/Login.css";
import logo from "../images/Logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Input, message } from "antd";
import { jwtDecode } from "jwt-decode";
const baseURL = "https://nhub.site/api/accounts/user-login";
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
    try {
      if (!username || !password) {
        message.error("Missing username or password!");
        return;
      }
      let res = await loginApi(username, password);

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("token", res.data);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  return (
    <div className="relative">
      <Link to="/">
        <Button className="absolute top-2 right-3">Back to Home Page</Button>
      </Link>
      <div className="flex justify-between">
        <div className="login-content flex gap-48">
          <div className="loginImage">
            <img
              className="bg-cover bg-center relative "
              src={loginImage}
              alt="logo"
            ></img>
          </div>
          <div className="flex justify-center">
            <div className="inputForm items-center justify-center">
              <div className="loginLogo">
                <img src={logo} alt="logo"></img>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="w-[320px]">Username</p>
                <input
                  className="loginInput focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                ></input>
                <div className="w-[320px]">Password</div>
                <Input.Password
                  className="loginInput focus:outline-none"
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

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
      </div>
    </div>
  );
};
export default Login;
