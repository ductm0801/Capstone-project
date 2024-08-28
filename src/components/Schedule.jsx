import { useEffect, useState } from "react";
import defaultImg from "../images/Avatar.png";
import moment from "moment";

import "../App.css";
import tourch from "../images/torch.png";
import axios from "axios";
import MatchResult from "./MachResult";
import { renderBgColorStatus } from "../utils";

const Schedule = ({ match, onSave, roundId, onSave2, isCompleted }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [set, setSet] = useState([]);
  const handleOpenPopup = async (matchId) => {
    setOpenPopup(true);
    fetchSet(matchId);
  };

  const fetchSet = async (matchId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/accounts/${matchId}`
      );
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
              <div className="border relative h-[134px] bg-white w-[750px] flex gap-4 items-center justify-start">
                <div>
                  <div className="flex flex-col mx-[32px]">
                    <div className="text-[48px] font-bold text-[#C6C61A]">
                      {moment(item.matchDate).format("HH")}
                    </div>
                    <span className="text-[#1244A2] text-[16px] absolute top-8 left-[91px] font-bold">
                      {moment(item.matchDate).format("mm")}
                    </span>
                    <div>
                      {moment(item.matchDate).format("dddd, DD/MM/YYYY")}
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
                <div>
                  {isCompleted ? (
                    ""
                  ) : (
                    <button
                      className="bg-blue-300 text-blue-700 font-semibold  rounded-full px-2"
                      onClick={() => handleOpenPopup(item.matchId)}
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {openPopup && (
        <MatchResult
          openPopup={openPopup}
          handleClose={() => setOpenPopup(false)}
          set={set}
          onSave={onSave}
          onSave2={onSave2}
        />
      )}
    </div>
  );
};

export default Schedule;
