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
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";
import { Button, message } from "antd";
import Register from "../Pages/SignUp";
import About from "../components/About";
import Schedule from "../components/Schedule";
import moment from "moment";

const TournamentDetail = () => {
  const URL = "https://nhub.site/api/tournament-campaign";
  const [tournament, setTournament] = useState("");
  const [activeTab, setActiveTab] = useState("Format");
  const [refreshFormatType, setRefreshFormatType] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [register, setRegister] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { id } = useParams();
  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    if (id) getOneTournament(id);
    decodeToken();
  }, [id, jwtToken]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decoded = jwtDecode(token);
        const role = decoded.Role;
        setUserRole(role);
      }
    } catch (error) {
      // message.error(error.response.data);
    }
  }, []);

  const decodeToken = () => {
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      setAccountId(decodedToken.UserId);
    }
  };

  const handleRegister = () => {
    setRegister(true);
  };

  const handleClosePopup = () => {
    setRegister(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getOneTournament = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      if (res.status === 200) {
        console.log("Tournament data:", res.data);
        setTournament(res.data);
      } else {
        console.error("Failed to fetch tournament details", res);
        toast.error("Failed to fetch tournament details");
      }
    } catch (error) {
      console.error("Error fetching tournament details:", error);
      toast.error("Error fetching tournament details");
    }
  };

  return (
    <div>
      <div className="tDetail-bg mt-16">
        <div className="flex">
          <img
            className="w-[120px] h-[120px] rounded-full mt-[32px] ml-[112px] mb-[97px]"
            src={tournament.img ? tournament.img : defaultImg}
            alt={tournament.id}
          />
          <div className="mt-[32px] ml-[24px]">
            <h1 className="text-white text-[24px] font-semibold">
              {tournament.tournamentName}
            </h1>
            <p className="text-white text-gray-400">
              {moment(tournament.startDate).format("DD-MM-YYYY")} -{" "}
              {moment(tournament.endDate).format("DD-MM-YYYY")}
            </p>

            {!userRole && (
              <div>
                <button
                  className="text-white bg-[#C6C61A] border-[#C6C61A] mt-[32px] px-12 py-2 rounded-lg text-2xl hover:text-black hover:bg-white hover:border-white "
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-white">
          <ul className="flex gap-8 items-center ml-[112px]">
            <li
              className={`tab-item ${
                activeTab === "Format" ? "active" : ""
              } mb-[12px]`}
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
        className={`tab-content ${activeTab === "About" ? "active" : ""}`}
        id="About"
      >
        <About />
      </div>

      <Register show={register} closePopup={handleClosePopup} campaignId={id} />
    </div>
  );
};

export default TournamentDetail;
