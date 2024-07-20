import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const DropdownProfile = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleProfileClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const Logout = () => {
    localStorage.clear();
  };
  return (
    <div className="dropDownProfile">
      <div className="flex flex-col items-center justify-center">
        <div className="text-black ">
          <div
            className="flex items-center m-4 border-b-2 gap-2 cursor-pointer"
            onClick={handleProfileClick}
          >
            <CgProfile />
            <div>Profile</div>
          </div>
        </div>
        <div className="text-black ">
          <Link to="/login">
            <div className="flex items-center border-b-2  mb-4 gap-2 ">
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
