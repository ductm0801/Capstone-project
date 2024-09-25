import { useEffect, useState } from "react";
import defaultImg from "../images/Avatar.png";
import moment from "moment";

import "../App.css";
import tourch from "../images/torch.png";
import axios from "axios";
import MatchResult from "./MachResult";
import { renderBgColorStatus } from "../utils";
import MatchResultRound from "./MatchResultRound";

const ScheduleRound = ({ match, onSave, roundId, onSave2, onSave3 }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [set, setSet] = useState([]);

  const [openPopup2, setOpenPopup2] = useState(false);
  const [openPopup3, setOpenPopup3] = useState(false);
  const [options, setOptions] = useState(false);
  const userRole = localStorage.getItem("role");
  const [matchId, setMatchId] = useState(null);
  const handleOpenPopup = async (matchId) => {
    setOpenPopup(true);
    fetchSet(matchId);
  };

  const fetchSet = async (matchId) => {
    try {
      setMatchId(matchId);
      const response = await axios.get(`https://nhub.site/api/set/${matchId}`);
      if (response.status === 200) {
        setSet(response.data);
        onSave(roundId);
      } else {
        console.error("Failed to fetch set");
      }
    } catch (error) {
      console.error("Error fetching set:", error);
    }
  };
  const handleOpenUpdateDate = (matchId) => {
    setOpenPopup2(true);
    setMatchId(matchId);
  };
  const handleCloseUpdateDate = () => {
    setOpenPopup2(false);
    setMatchId(null);
  };

  const handleOpenUpdateCourt = (matchId) => {
    setOpenPopup3(true);
    setMatchId(matchId);
  };
  const handleCloseUpdateCourt = () => {
    setOpenPopup3(false);
    setMatchId(null);
  };
  return (
    <div className="bg-[#EFEFEF] pt-[48px] pb-[48px]">
      <h1 className="text-3xl font-semibold ml-[112px] mb-[48px]">
        Match Schedule
      </h1>
      <div className="flex flex-col gap-8">
        {match &&
          match.length > 0 &&
          match.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex justify-center items-center flex-col">
                <img className="w-[60px] h-[60px]" src={tourch} alt="" />
                <div className="trapezium-container">
                  <span className="trapezium-text text-3xl font-semibold">
                    Round: {item.roundOrder}
                  </span>
                </div>
              </div>
              <div className="border relative h-[134px] bg-white w-[750px] flex gap-4 items-center justify-between p-4">
                <div>
                  <div className="flex flex-col mx-[32px]">
                    <div className="text-[48px] font-bold text-[#C6C61A]">
                      {moment(item.matchDate).format("HH")}
                    </div>
                    <span className="text-[#1244A2] text-[16px] absolute top-8 left-[105px] font-bold">
                      {moment(item.matchDate).format("mm")}
                    </span>
                    <div>
                      {moment(item.matchDate).format("dddd, DD/MM/YYYY")}
                    </div>
                    <div>
                      {userRole === "Manager" &&
                        item.matchStatus !== "Completed" &&
                        item.matchStatus !== "Canceled" && (
                          <div className="relative">
                            <button
                              className="bg-orange-300 text-white font-semibold rounded-full px-6 py-1"
                              onClick={() => setOptions((prev) => !prev)}
                            >
                              Options
                            </button>
                            {options && (
                              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
                                <div className="flex flex-col gap-2 p-2">
                                  <button
                                    className="bg-blue-300 text-blue-700 font-semibold rounded-full px-2"
                                    onClick={() =>
                                      handleOpenPopup(item.matchId)
                                    }
                                  >
                                    Update Result
                                  </button>
                                  <button
                                    className="bg-green-300 text-green-700 font-semibold rounded-full px-2"
                                    onClick={() =>
                                      handleOpenUpdateDate(item.matchId)
                                    }
                                  >
                                    Update Detail
                                  </button>
                                  <button
                                    className="bg-violet-300 text-violet-700 font-semibold rounded-full px-2"
                                    onClick={() =>
                                      handleOpenUpdateCourt(item.matchId)
                                    }
                                  >
                                    Update Status
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center ">
                  <span className="text-xl flex items-center font-semibold">
                    {item.firstTeam || "Team 1"} {item.firstTeamScore}
                  </span>
                  <span className="text-[#C6C61A] text-lg">VS</span>
                  <span className="text-xl flex items-center font-semibold">
                    {item.secondTeam || "Team 2"}
                  </span>
                </div>
                <div
                  className={` bg-gradient-to-tl  px-3 text-md rounded-lg py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white ${renderBgColorStatus(
                    item.matchStatus
                  )}`}
                >
                  {item.matchStatus}
                </div>
                <div className="text-lg font-semibold">
                  Court: {item.court ? item.court : "To be determined"}
                </div>
              </div>
            </div>
          ))}
      </div>
      {openPopup && (
        <MatchResultRound
          openPopup={openPopup}
          handleClose={() => setOpenPopup(false)}
          set={set}
          onSave3={onSave3}
          onSave4={() => fetchSet(matchId)}
        />
      )}
    </div>
  );
};

export default ScheduleRound;
