import React, { useState } from "react";
import { message, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import bgSignup1 from "../images/hp-bg-3.png";
import "../styles/ManagerLogin.css";
import { useNavigate } from "react-router-dom";

export default function ManagerLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSignin = async () => {
    if (!username || !password) {
      message.error("Please enter both username and password.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/accounts/manager-login",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        message.success("Login successful");
        localStorage.setItem("token", response.data);
        localStorage.setItem("role", "Manager");
        navigate("/manager");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to login");
    }
  };

  return (
    <div
      className="max-h-[100vh] px-2"
      style={{
        backgroundImage: `url(${bgSignup1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: window.screen.width <= 768 ? "30% 35%" : "50% 85%",
      }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg border border-inherit p-8">
          <form
            id="formSignIn"
            className="w-[400px] text-center px-3 sm:px-0"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              onSignin();
            }}
          >
            <h5 className="text-black font-medium text-[32px] text-center mb-[8px]">
              Sign In
            </h5>
            <h5 className="mb-[5px] mt-[5px] font-[400] text-[13px] sm:text-[16px] text-center md:text-left text-black ">
              <b>PickleBall Tournament</b> WelCome Back!!!
            </h5>
            <h5 className="whitespace-break-spaces mb-[30px] font-[400] sm:text-[24px] text-[20px] text-center md:text-left text-black ">
              Have a nice day!!!
            </h5>
            <div>
              <Input
                onChange={(e) => setUsername(e.target.value || "")}
                autoComplete="off"
                placeholder="Tên Đăng Nhập"
                type="text"
                value={username}
                className="bg-transparent border border-inherit py-2 text-[#858585] text-[16px] font-[400] active:bg-transparent focus-visible:outline-none pl-[8px] flex-1"
              />
            </div>
            <div className="mt-[16px]">
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                autoComplete="off"
                value={password}
                className="bg-transparent border border-inherit py-2 text-[#858585] text-[16px] font-[400] active:bg-transparent focus-visible:outline-none pl-[8px] flex-1"
              />
            </div>
            <Button
              type="primary"
              onClick={onSignin}
              className="text-white p-2 mt-6 font-bold text-[16px] bg-[#C6C61A] rounded-[8px] w-full mb-[40px] h-fit"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
