import React from "react";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const DropdownProfile = () => {
  const Logout = () => {
    localStorage.clear();
  };
  return (
    <div className="dropDownProfile">
      <div className="flex flex-col items-center justify-center">
        <div className="text-black ">
          <Link to="/profile" href="/Profile">
            <div className="flex items-center m-4 border-b-2 gap-2 ">
              <CgProfile />
              <div>Profile</div>
            </div>
          </Link>
        </div>
        <div className="text-black ">
          <Link to="/login" href="/Profile">
            <div className="flex items-center border-b-2  mb-4 gap-2 ">
              <RiLogoutBoxRLine />
              <div onClick={Logout}>Logout</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DropdownProfile;
