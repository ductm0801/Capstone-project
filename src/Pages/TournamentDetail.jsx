import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/tournamentDetail.css";
import Test from "./test";
import Competitor from "../components/Competitor";
import CreateTournamentFormat from "../components/CreateTournamentFormat";
import defaultImg from "../images/defaultImg.png";
import { jwtDecode } from "jwt-decode";
const TournamentDetail = () => {
  const URL = "http://localhost:5000/api/tournament-campaign";
  const [tournament, SetTournament] = useState("");
  const [activeTab, setActiveTab] = useState("Format");
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setUserRole(role);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, []);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const getOneTournament = async (id) => {
    const res = await axios.get(`${URL}/${id}`);
    if (res.status === 200) {
      SetTournament(res.data);
      console.log(tournament);
    }
  };
  useEffect(() => {
    if (id) getOneTournament(id);
  }, [id]);

  const handleAddButtonClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="tDetail-bg mt-16">
        <div className=" flex ">
          <img
            className="w-[120px] h-[120px] rounded-full mt-[32px] ml-[112px] mb-[97px]"
            src={tournament.img ? tournament.img : defaultImg}
            alt={tournament.id}
          />
          <div className="mt-[32px] ml-[24px]">
            <h1 className="text-white">{tournament.tournamentName}</h1>
            <p className="text-white">
              Rounded and KnockDown | PickleBall | {tournament.createdBy}
            </p>
          </div>
        </div>
        <div className="text-white  ">
          <ul className="flex gap-8 items-center ml-[112px] ">
            <li
              className={`tab-item ${
                activeTab === "Format" ? "active" : ""
              } mb-[12px] `}
              onClick={() => handleTabClick("Format")}
            >
              Format
            </li>
            <li
              className={`tab-item ${
                activeTab === "Competitor" ? "active" : ""
              } mb-[12px]`}
              onClick={() => handleTabClick("Competitor")}
            >
              Competitor
            </li>
            <li
              className={`tab-item ${
                activeTab === "Tournament" ? "active" : ""
              } mb-[12px] `}
              onClick={() => handleTabClick("Tournament")}
            >
              Tournament
            </li>
            <li
              className={`tab-item ${
                activeTab === "Schedule" ? "active" : ""
              } mb-[12px] `}
              onClick={() => handleTabClick("Schedule")}
            >
              Schedule
            </li>
            <li
              className={`tab-item ${
                activeTab === "About" ? "active" : ""
              } mb-[12px]`}
              onClick={() => handleTabClick("About")}
            >
              About
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`tab-content ${activeTab === "Format" ? "active" : ""}`}
        id="Format"
      >
        <h1>Format</h1>
        <p>Content for Competition Format.</p>
      </div>
      <div
        className={`tab-content ${activeTab === "Competitor" ? "active" : ""}`}
        id="Competitor"
      >
        <Competitor />
      </div>
      <div
        className={`tab-content ${activeTab === "Tournament" ? "active" : ""}`}
        id="Tournament"
      >
        <Test />
      </div>
      <div
        className={`tab-content ${activeTab === "Schedule" ? "active" : ""}`}
        id="Schedule"
      >
        <h1>Schedule</h1>
        <p>Content for Schedule.</p>
      </div>
      <div
        className={`tab-content ${activeTab === "About" ? "active" : ""}`}
        id="About"
      >
        <h1>About</h1>
        <p>Content for About.</p>
      </div>
      {userRole === "Manager" && (
        <button className="add-button" onClick={handleAddButtonClick}>
          +
        </button>
      )}
      <CreateTournamentFormat
        show={showPopup}
        handleClose={handleClosePopup}
      ></CreateTournamentFormat>
    </div>
  );
};
export default TournamentDetail;
