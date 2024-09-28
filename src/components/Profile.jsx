import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/header.css";
import defaultImg from "../images/competitor-img.png";
import femaleImg from "../images/defaultFemale.png";
import UserContext from "../context/UserContext";
import { FaLongArrowAltLeft } from "react-icons/fa";

import { Button, Form, Input, Upload, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import moment from "moment";

const Profile = ({ show, handleClose, profile }) => {
  const { user, setUser } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetpassword, setResetPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "male",
    imageUrl: imageSrc,
  });

  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://nhub.site/api/users/${user.UserId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;
        setFormData({
          fullName: data.fullName || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          gender: data.gender || "male",
          imageUrl: data.imageUrl,
        });
        setImageSrc(
          data.imageUrl || (data.gender === "Male" ? defaultImg : femaleImg)
        );
      } catch (error) {
        message.error(error.response.data);
      }
    };

    fetchUserData();
  }, [user.UserId]);

  const uploadURL = "https://nhub.site/api/image/upload";

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(uploadURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        setImageSrc(res.data.url);
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageUrl: res.data.url,
        }));
        message.success("Image uploaded successfully!");
        return res.data.url;
      }
    } catch (error) {
      message.error("Image upload failed.");
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      ...formData,
      imageUrl: imageSrc,
      dateOfBirth: moment(formData.dateOfBirth).format("DD-MM-YYYY"),
    };

    try {
      const res = await axios.put(
        `https://nhub.site/api/users/${user.UserId}`,
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Profile updated successfully!");
        setUser({ ...user, ...params });
        handleClose();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update profile");
    }
  };
  const onFinish = async (values) => {
    const { oldPassword, newPassword } = values;

    try {
      const response = await axios.post(
        "https://nhub.site/api/accounts/change-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setResetPassword(false);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <button onClick={handleClose} className="close-button text-3xl">
          &times;
        </button>
        {resetpassword ? (
          <div className="flex flex-col">
            <div
              className="flex gap-2 items-center cursor-pointer border-2 border-gray-200 px-2 rounded-lg w-fit"
              onClick={() => setResetPassword(false)}
            >
              <FaLongArrowAltLeft /> Back to Profile
            </div>
            <h1 className="text-3xl">Change Password</h1>
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Old Password"
                name="oldPassword"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
              >
                <Input.Password placeholder="Enter old password" />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long!",
                  },
                ]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                labelCol={{ span: 24 }}
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords you entered do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className="flex">
            <div className="flex flex-col gap-4">
              <img src={imageSrc} width={200} height={200} alt="" />
              <Upload
                maxCount={1}
                accept="image/*"
                customRequest={({ file, onSuccess }) => {
                  uploadImage(file).then((url) => {
                    if (url) {
                      onSuccess(url);
                    }
                  });
                }}
                showUploadList={false}
              >
                <div>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </div>
              </Upload>
              <div className="mt-8">
                <Button onClick={() => setResetPassword(true)}>
                  Reset Password
                </Button>
              </div>
            </div>

            <form
              className="ml-[64px] w-[320px] mr-[106px] flex flex-col grow-1"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName || ""}
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender || "male"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-4 text-left">
                Rank
                <div className="text-[#C6C61A] mt-1.5">
                  {user.rank ? user.rank : "1.0"}
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#C6C61A] text-white py-[10px] px-[37px] rounded-lg"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
