import React, { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";
import { message } from "antd";
import UserContext from "../context/UserContext";

const DropdownProfile = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [userName, setUserName] = useState();
  const handleProfileClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const Logout = () => {
    localStorage.clear();
  };

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
        setUserName(response.data.fullName);
      } catch (error) {
        message.error(error.response.data);
      }
    };

    fetchUserData();
  }, [user.UserId]);
  return (
    <div className="dropDownProfile">
      <div className="flex flex-col items-start w-full">
        <div className="text-black ">
          <div className="flex items-center m-4 gap-2 cursor-pointer">
            Hi! <span className="font-semibold">{userName}</span>
          </div>
          <div
            className="flex items-center m-4 border-b-2 gap-2 cursor-pointer"
            onClick={handleProfileClick}
          >
            <CgProfile />
            <div>Profile</div>
          </div>
          <Link to="/login">
            <div className="flex items-center m-4 border-b-2 gap-2 cursor-pointer">
              <RiLogoutBoxRLine />
              <div onClick={Logout}>Logout</div>
            </div>
          </Link>
        </div>
      </div>
      <Profile show={showPopup} handleClose={handleClosePopup}></Profile>
    </div>
  );
};
export default DropdownProfile;
