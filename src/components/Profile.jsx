import React, { useContext, useState } from "react";
import "../styles/header.css";
import defaultImg from "../images/competitor-img.png";
import UserContext from "../context/UserContext";
import { CgSoftwareUpload } from "react-icons/cg";

const Profile = ({ show, handleClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState(defaultImg);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const showHideClassName = show ? "popup display-block" : "popup display-none";

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
      console.log(formData);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to the server
    setUser({ ...user, ...formData });
    handleClose();
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
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder={user.UserName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                Date of Birth
              </label>
              <input
                type="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
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
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                Phone Number
              </label>
              <input
                type="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4 text-left">
              Rank
              <div className="text-[#C6C61A] mt-1.5">
                {user.Rank ? user.Rank : "1.0"}
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
