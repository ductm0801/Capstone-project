import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/header.css";
import defaultImg from "../images/competitor-img.png";
import UserContext from "../context/UserContext";
import { CgSoftwareUpload } from "react-icons/cg";
import { toast } from "react-toastify";
import { message } from "antd";

const Profile = ({ show, handleClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState(defaultImg);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: "", // Changed password to address
    gender: "male", // Added gender field
  });
  const showHideClassName = show ? "popup display-block" : "popup display-none";

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://webapi20240806093436.azurewebsites.net/api/users/${user.UserId}`
        );
        const data = response.data;
        setFormData({
          fullName: data.fullName || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          gender: data.gender || "male",
        });
        setImageSrc(
          data.image ? `data:image/png;base64,${data.image}` : defaultImg
        );
      } catch (error) {
        message.error(error.response.data);
      }
    };

    fetchUserData();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result.split(",")[1];
        setFormData({
          ...formData,
          image: base64String,
        });
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://webapi20240806093436.azurewebsites.net/api/users/${user.UserId}`,
        formData
      );
      if (res.status === 204) {
        toast.success("Profile updated successfully!");
        setUser({ ...user, ...formData });
        handleClose();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <button onClick={handleClose} className="close-button text-3xl">
          &times;
        </button>
        <div className="flex">
          <div className="relative">
            <img
              src={imageSrc}
              className="w-[400px] h-[560px] object-scale-down"
              alt="Profile Pic"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="image-input"
              className="hidden"
            />
            <label htmlFor="image-input">
              <CgSoftwareUpload className="text-white text-3xl p-4 w-16 h-16 bg-black bg-opacity-50 rounded-lg absolute top-3 right-5" />
            </label>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
