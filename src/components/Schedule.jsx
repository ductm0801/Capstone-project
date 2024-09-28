import { useEffect, useState } from "react";
import defaultImg from "../images/Avatar.png";
import moment from "moment";

import "../App.css";
import tourch from "../images/torch.png";
import axios from "axios";
import MatchResult from "./MachResult";
import { renderBgColorStatus } from "../utils";
import { Empty, Pagination } from "antd";
import UpdateDate from "./UpdateDate";
import UpdateCourt from "./UpdateCourt";

const Schedule = ({
  match,
  onSave,
  roundId,
  onSave2,
  onSave3,
  onSave5,
  isCompleted,
  pageSize,
  pageIndex,
  totalItemsCount,
  handlePageChange,
  fetchEliMatch,
  fetchSchedule,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openPopup3, setOpenPopup3] = useState(false);
  const [set, setSet] = useState([]);
  const [matchId, setMatchId] = useState(null);
  const [options, setOptions] = useState(false);
  const userRole = localStorage.getItem("role");

  const handleOpenPopup = async (matchId) => {
    setOpenPopup(true);
    fetchSet(matchId);
  };

  const handleClosePopup = (matchId) => {
    setOpenPopup(false);
    fetchSet(matchId);
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

  return (
    <div className="pt-[48px] pb-[48px]">
      <h1 className="text-3xl font-semibold ml-[112px] mb-[48px]">
        Match Schedule
      </h1>
      <div className="flex flex-col gap-8">
        {match && match.length > 0 ? (
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
              <div className="border relative h-[180px] rounded-lg bg-white w-[1000px] flex flex-col gap-4 items-center justify-between p-4">
                <div className="flex justify-between items-center w-full">
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
                                    <button
                                      className="bg-blue-300 text-blue-700 font-semibold rounded-full px-2"
                                      onClick={() =>
                                        handleOpenPopup(item.matchId)
                                      }
                                    >
                                      Update Result
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
                  <div className="flex flex-col space-between items-center">
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
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
      <div className="flex w-full justify-center">
        <Pagination
          current={pageIndex}
          pageSize={pageSize}
          total={totalItemsCount}
          showSizeChanger
          onChange={handlePageChange}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
      {openPopup && (
        <MatchResult
          openPopup={openPopup}
          handleClose={handleClosePopup}
          set={set}
          onSave={onSave}
          onSave2={onSave2}
          onSave3={onSave3}
          onSave5={onSave5}
          fetchEliMatch={fetchEliMatch}
          onSave4={() => fetchSet(matchId)}
          fetchSchedule={fetchSchedule}
        />
      )}
      {openPopup2 && (
        <UpdateDate
          open={openPopup2}
          handleClose={handleCloseUpdateDate}
          matchId={matchId}
          onSave2={onSave2}
          onSave={onSave5}
          fetchSchedule={fetchSchedule}
        />
      )}
      {openPopup3 && (
        <UpdateCourt
          open={openPopup3}
          handleClose={handleCloseUpdateCourt}
          matchId={matchId}
          onSave={onSave}
          onSave2={onSave2}
          fetchSchedule={fetchSchedule}
        />
      )}
    </div>
  );
};

export default Schedule;
