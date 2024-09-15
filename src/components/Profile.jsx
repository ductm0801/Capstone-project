import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/header.css";
import defaultImg from "../images/competitor-img.png";
import UserContext from "../context/UserContext";
import { Button, Upload, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const Profile = ({ show, handleClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "male",
    imageUrl: imageSrc, // This will be updated when the image is uploaded
  });

  const showHideClassName = show ? "popup display-block" : "popup display-none";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://nhub.site/api/users/${user.UserId}`
        );
        const data = response.data;
        setFormData({
          fullName: data.fullName || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          gender: data.gender || "male",
          imageUrl: data.imageUrl || defaultImg, // If no image URL, use the default image
        });
        setImageSrc(data.imageUrl || defaultImg); // Initialize the imageSrc with the user's current image
      } catch (error) {
        message.error(error.response.data);
      }
    };

    fetchUserData();
  }, [user.UserId]);

  const uploadURL = "https://nhub.site/api/image/upload";

  // Function to handle image upload
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
        setImageSrc(res.data.url); // Set the new image URL to imageSrc
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageUrl: res.data.url, // Update the imageUrl in formData
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

    // Update imageUrl in formData with the latest imageSrc
    const updatedFormData = {
      ...formData,
      imageUrl: imageSrc, // Ensure imageUrl is the latest uploaded image
    };

    try {
      const res = await axios.put(
        `https://nhub.site/api/users/${user.UserId}`,
        updatedFormData
      );
      if (res.status === 200) {
        toast.success("Profile updated successfully!");
        setUser({ ...user, ...updatedFormData });
        handleClose();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <button onClick={handleClose} className="close-button text-3xl">
          &times;
        </button>
        <div className="flex">
          <div className="flex flex-col gap-4">
            <img src={imageSrc} width={200} height={200} />
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
      </section>
    </div>
  );
};

export default Profile;
