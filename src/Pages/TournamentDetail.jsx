import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/tournamentDetail.css";
import Competitor from "../components/Competitor";
import CreateTournamentFormat from "../components/CreateTournamentFormat";
import defaultImg from "../images/defaultImg.png";
import { jwtDecode } from "jwt-decode";
import FormatType from "../components/FormatType";
import { IoIosChatbubbles } from "react-icons/io";
const TournamentDetail = () => {
  const URL = "http://localhost:5000/api/tournament-campaign";
  const [tournament, SetTournament] = useState("");
  const [activeTab, setActiveTab] = useState("Format");
  const [refreshFormatType, setRefreshFormatType] = useState(false);
  const { id } = useParams();

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
        <FormatType tournamentId={id} refresh={refreshFormatType} />
      </div>
      <div
        className={`tab-content ${activeTab === "Competitor" ? "active" : ""}`}
        id="Competitor"
      >
        <Competitor />
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

      <div className="flex flex-col mx-[112px] mt-[52px]">
        <h1 className="flex items-center gap-2 text-3xl text-[#C6C61A] mb-[24px]">
          <span>
            <IoIosChatbubbles className="text-blue-900" />
          </span>
          Comments
        </h1>
        <textarea
          type="text"
          placeholder="Write your comment"
          className="mb-[24px] p-4 border rounded-lg"
        />
      </div>
    </div>
  );
};
export default TournamentDetail;
