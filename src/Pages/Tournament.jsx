import React, { useEffect, useState } from "react";

import searchicon from "../images/Frame 4.png";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
import defaultImg from "../images/defaultImg.png";
import "../styles/tournament.css";
const Tournament = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected, setSelected] = useState("Status");
  const [selected1, setSelected1] = useState("Last Update");
  const [tournaments, setTournaments] = useState([]);
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [search, setSearch] = useState("");

  const URL = "http://localhost:5000/api/tournament-campaign";

  const getListTournament = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
      setTournaments(res.data);
    }
  };
  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  useEffect(() => {
    getListTournament();
  }, []);
  const optionsStatus = [
    "Scheduled",
    "InProgress",
    "Completed",
    "Postponed",
    "Canceled",
    "WaitForResult",
  ];
  const optionsTime = ["Last Update", "Newest", "Oldest"];

  return (
    <div>
      <div
        style={{
          display: "flex",
          paddingTop: "44px",
          paddingLeft: "112px",
          paddingBottom: "24px",
          justifyContent: "space-between",
          paddingRight: "112px",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <input
            className="border-2 border-inherit mt-16 rounded-l-lg w-full sm:w-[320px] h-[44px] p-4 sm:p-2 md:p-4 lg:p-6 bg-white focus:outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          ></input>{" "}
          <img className="mt-16" src={searchicon} alt=""></img>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "16px",
          }}
        >
          <div className="flex flex-col mt-16 items-center w-[137px] h-[44px] justify-between rounded-lg border-gray-300 border-2 text-base px-3">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex justify-between w-full items-center p-1"
            >
              {selected}
              {!isOpen ? (
                <FaChevronDown className="h-8 text-slate-500  " />
              ) : (
                <FaChevronUp className="h-8 text-slate-500  " />
              )}
            </button>
            {isOpen && (
              <div className="bg-white  border-gray-300 border-2 absolute top-44 w-[137px] flex flex-col items-start rounded-lg p-2">
                {optionsStatus.map((option, i) => (
                  <div
                    onClick={(e) => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className="flex w-full justify-between border-inherit  border-b-2 p-3 cursor-pointer"
                    key={i}
                  >
                    <p className="">{option}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap mt-16 flex-col items-center w-[147px] h-[44px] justify-between rounded-lg border-gray-300 border-2 text-base px-3">
            <button
              onClick={() => setIsOpen1((prev) => !prev)}
              className="flex justify-between w-full items-center p-1"
            >
              {selected1}
              {!isOpen1 ? (
                <FaChevronDown className="h-8 text-slate-500  " />
              ) : (
                <FaChevronUp className="h-8 text-slate-500  " />
              )}
            </button>
            {isOpen1 && (
              <div className="bg-white border-gray-300 border-2 absolute top-44 w-[137px] flex flex-col items-start rounded-lg p-2 ">
                {optionsTime.map((option, i) => (
                  <div
                    onClick={(e) => {
                      setSelected1(option);
                      setIsOpen1(false);
                    }}
                    className="flex w-full justify-between border-inherit  border-b-2 p-3 cursor-pointer"
                    key={i}
                  >
                    <p className="">{option}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="flex justify-between">
          <p className="ml-[112px] pt-[40px] mb-[56px]">
            {" "}
            {tournaments.length} Tournaments
          </p>
          <div className=" flex flex-wrap justify-center items-center mr-[112px] pt-[40px] mb-[56px]">
            <div
              className={`w-[56px] h-[40px] border-2 border-solid border-slate-300 rounded-l-lg cursor-pointer flex justify-center items-center ${
                !isGridLayout ? "bg-[#C6C61A]" : "bg-white"
              }`}
              onClick={() => toggleLayout(false)}
            >
              <MdFormatListBulleted className="w-[24px] h-[24px] mx-[16px] my-[8px]" />
            </div>
            <div
              className={`w-[56px] h-[40px] border-2 border-solid border-slate-300 rounded-r-lg cursor-pointer flex justify-center items-center ${
                isGridLayout ? "bg-[#C6C61A]" : "bg-white"
              }`}
              onClick={() => toggleLayout(true)}
            >
              <FiGrid className="w-[24px] h-[24px]  mx-[16px] my-[8px]" />
            </div>
          </div>
        </div>
        <div>
          {isGridLayout ? (
            <div className="grid grid-cols-auto-fit sm:grid-cols-auto-fit md:grid-cols-auto-fit lg:grid-cols-auto-fit xl:grid-cols-auto-fit gap-8 justify-items-center justify-center pb-[120px] ">
              {tournaments &&
                tournaments
                  .filter((tournament) => {
                    return search.toLowerCase() === ""
                      ? tournament
                      : tournament.name.includes(search);
                  })
                  .map((tournament) => (
                    <div
                      className="w-[384px] h-[308px] p-0"
                      key={tournament.id}
                    >
                      <Link to={`/tournamentDetail/${tournament.id}`}>
                        <div className="flex flex-wrap flex-col justify-around items-center w-[384px] h-[308px] border-2 border-solid bg-white rounded-lg">
                          <img
                            className="w-[64px] h-[64px]"
                            src={tournament.img ? tournament.img : defaultImg}
                            alt={tournament.id}
                          />
                          <p className="font-bold text-lg">
                            {tournament.tournamentName}
                          </p>
                          <p className="text-base">
                            Round and KnockOut | PickleBall |{" "}
                            {tournament.CreatedBy}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>
          ) : (
            <div className="flex flex-wrap flex-col items-center">
              {tournaments &&
                tournaments
                  .filter((tournament) => {
                    return search.toLowerCase() === ""
                      ? tournament
                      : tournament.name.includes(search);
                  })
                  .map((tournament) => (
                    <div key={tournament.id}>
                      <Link to={`/tournamentDetail/${tournament.id}`}>
                        <div className="flex flex-wrap xl:flex-nowrap items-center rounded-lg gap-6 border-2 w-full xl:w-[1008px] h-auto bg-white border-solid my-[16px] p-4">
                          <img
                            className="w-[156px] h-[156px] m-[16px] flex-shrink-0"
                            src={tournament.img ? tournament.img : defaultImg}
                            alt={tournament.id}
                          />
                          <div className="flex-1">
                            <p className="my-[16px] font-bold text-lg">
                              {tournament.tournamentName}
                            </p>
                            <p className="text-base">
                              Round and KnockOut | PickleBall |{" "}
                              {tournament.CreatedBy}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Tournament;
