import "../styles/manager.css";
import Avatar from "../images/Avatar.png";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbTournament } from "react-icons/tb";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { GiPodiumWinner } from "react-icons/gi";
import { FaUser } from "react-icons/fa6";

import { useState } from "react";

const Manager = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const [clubDropdown, setClubDropdown] = useState(false);
  const [tournamentDropdown, setTournamentDropdown] = useState(false);

  const toggleDropdown = (dropdown) => {
    if (dropdown === "user") {
      setUserDropdown(!userDropdown);
      setClubDropdown(false);
      setTournamentDropdown(false);
    } else if (dropdown === "club") {
      setClubDropdown(!clubDropdown);
      setUserDropdown(false);
      setTournamentDropdown(false);
    } else if (dropdown === "tournament") {
      setTournamentDropdown(!tournamentDropdown);
      setUserDropdown(false);
      setClubDropdown(false);
    }
  };
  return (
    <div className="flex">
      <div className="manager-header relative">
        <div className="text-white flex gap-4 mb-[48px] pt-[32px] pl-[40px]">
          <img className="w-[48px] h-[48px]" src={Avatar} alt=""></img>
          <div>
            <p>Tran Minh Duc</p>
            <p>Manager</p>
          </div>
        </div>
        <div className="grow">
          <ul className="flex flex-col manager-menu text-white">
            <li
              className={`flex items-center gap-2 menu-span ${
                userDropdown ? "active" : ""
              }`}
              onClick={() => toggleDropdown("user")}
            >
              <FaUser />
              User
              <span className="ml-auto mr-4">
                {userDropdown ? (
                  <MdOutlineKeyboardArrowDown />
                ) : (
                  <MdOutlineKeyboardArrowLeft />
                )}
              </span>
            </li>

            {userDropdown && (
              <div
                className={`dropdown-content menu-span ${
                  userDropdown ? "active" : ""
                }`}
              >
                <div className="flex items-center gap-2 border-b border-white h-[60px] pl-4">
                  <AiOutlineUsergroupAdd /> Add User
                </div>
                <div className="dropdown-item menu-span gap-2 border-b border-white h-[60px] flex items-center pl-4">
                  <FaUserEdit /> Manage User
                </div>
              </div>
            )}
            <li
              className={`flex items-center gap-2 menu-span ${
                clubDropdown ? "active" : ""
              }`}
              onClick={() => toggleDropdown("club")}
            >
              <FaUserGroup />
              Club
              <span className="ml-auto mr-4">
                {clubDropdown ? (
                  <MdOutlineKeyboardArrowDown />
                ) : (
                  <MdOutlineKeyboardArrowLeft />
                )}
              </span>
            </li>
            {clubDropdown && (
              <div className="dropdown-content">
                <div
                  className={`dropdown-item menu-span ${
                    clubDropdown ? "active" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 border-b border-white h-[60px] pl-4">
                    <GoChecklist /> List Club Register
                  </div>
                  <div className="flex items-center gap-2 border-b border-white h-[60px] pl-4">
                    <AiOutlineUserAdd /> Club Members
                    <div />
                  </div>
                </div>
              </div>
            )}
            <li
              className={`flex items-center gap-2 menu-span ${
                tournamentDropdown ? "active" : ""
              }`}
              onClick={() => toggleDropdown("tournament")}
            >
              <TbTournament />
              Tournament
              <span className="ml-auto mr-4">
                {tournamentDropdown ? (
                  <MdOutlineKeyboardArrowDown />
                ) : (
                  <MdOutlineKeyboardArrowLeft />
                )}
              </span>
            </li>
            {tournamentDropdown && (
              <div
                className={`dropdown-item menu-span ${
                  tournamentDropdown ? "active" : ""
                }`}
              >
                <div className="flex items-center gap-2 border-b border-white h-[60px] pl-4">
                  <RiCalendarScheduleLine />
                  Schedule
                </div>
                <div className="flex items-center gap-2 border-b border-white h-[60px] pl-4">
                  <GiPodiumWinner />
                  Results
                  <div />
                </div>
              </div>
            )}
            <li>Sign Out</li>
          </ul>
        </div>
      </div>
      <div className="manager-content">
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
        <h1>Welcome to the Manager Dashboard</h1>
      </div>
    </div>
  );
};
export default Manager;
