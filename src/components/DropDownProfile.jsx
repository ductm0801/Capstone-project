import React from "react";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const DropdownProfile = () => {
  const Logout = () => {
    localStorage.clear();
  };
  return (
    <div className=" dropDownProfile">
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0",
        }}
      >
        <li>
          <Link to="/profile" style={{ color: "black" }} href="/Profile">
            Profile <CgProfile />
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            onClick={Logout}
            style={{ color: "black" }}
            href="/Logout"
          >
            Logout <RiLogoutBoxRLine />
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default DropdownProfile;
