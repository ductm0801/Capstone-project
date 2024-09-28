import React, { useEffect, useState } from "react";
import searchicon from "../images/Frame 4.png";
import { MdFormatListBulleted } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import axios from "axios";
import SignUp from "../Pages/SignUp";
import { Link } from "react-router-dom";
import defaultImg from "../images/defaultImg.png";
import { Button, message, Pagination, Popover, Select } from "antd"; // Import Popover and Select
import "../styles/tournament.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
dayjs.extend(customParseFormat);

const { Option } = Select;

const Tournament = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected, setSelected] = useState("Status");
  const [selected1, setSelected1] = useState("Last Update");
  const [tournaments, setTournaments] = useState([]);
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);
  const [statusOptions] = useState([
    "Scheduling",
    "InProgress",
    "Completed",
    "Postponed",
    "Canceled",
  ]);

  const URL = "https://nhub.site/api/tournament-campaign/paging";
  const URL2 = "https://nhub.site/api/campaign-registration/user";
  const pageSize = search ? 999 : isGridLayout ? 8 : 3;

  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleRegister = async (id) => {
    try {
      const res = await axios.post(
        `${URL2}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Successfully registered");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to register. Please try again.");
    }
  };

  const updateTournamentStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `https://nhub.site/api/tournament-campaign/status/${id}`,
        { campaignStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Status updated successfully");
      getListTournament(page, pageSize);
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to update status. Please try again.");
    }
  };

  const getListTournament = async (page, pageSize, status, search) => {
    try {
      const response = await axios.get(URL, {
        params: {
          pageIndex: page - 1,
          pageSize,
        },
      });
      if (response.status === 200 && Array.isArray(response.data.items)) {
        setTournaments(response.data.items);
        setTotalItemsCount(response.data.totalItemsCount);
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  useEffect(() => {
    getListTournament(page, pageSize);
  }, [page, pageSize]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGuestRegistration = (tournamentId) => {
    setOpen(true);
    setTournamentId(tournamentId);
  };

  const handleStatusChange = (tournamentId, newStatus) => {
    updateTournamentStatus(tournamentId, newStatus);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

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
        <div style={{ display: "flex" }}>
          <input
            className="border-2 border-inherit mt-16 rounded-l-lg w-full sm:w-[320px] h-[44px] p-4 sm:p-2 md:p-4 lg:p-6 bg-white focus:outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <img className="mt-16" src={searchicon} alt="" />
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="flex justify-between">
          <p className="ml-[112px] pt-[40px] mb-[56px]">
            {Array.isArray(tournaments) ? totalItemsCount : 0} Tournaments
          </p>
          <div className="flex flex-wrap justify-center items-center mr-[112px] pt-[40px] mb-[56px]">
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
              <FiGrid className="w-[24px] h-[24px] mx-[16px] my-[8px]" />
            </div>
          </div>
        </div>
        <div>
          {isGridLayout ? (
            <div className="grid grid-cols-auto-fit sm:grid-cols-auto-fit md:grid-cols-auto-fit lg:grid-cols-auto-fit xl:grid-cols-auto-fit gap-8 justify-items-center justify-center pb-[120px]">
              {Array.isArray(tournaments) &&
                tournaments
                  .filter((tournament) => {
                    return search.toLowerCase() === ""
                      ? tournament
                      : tournament.tournamentName
                          .toLowerCase()
                          .includes(search.toLowerCase());
                  })
                  .map((tournament) => (
                    <div
                      className="w-[384px] h-[308px] p-0"
                      key={tournament.id}
                    >
                      <Link to={`/tournamentDetail/${tournament.id}`}>
                        <div className="flex flex-wrap flex-col justify-around items-center w-[384px] h-[308px] border-2 border-solid bg-white rounded-lg">
                          <img
                            className="w-[80px] h-[80px]"
                            src={
                              tournament.imageUrl
                                ? tournament.imageUrl
                                : defaultImg
                            }
                            alt={tournament.id}
                          />
                          <p className="font-bold text-2xl">
                            {tournament.tournamentName}
                          </p>

                          {userRole === "Manager" &&
                          tournament.campaignStatus !== "Canceled" ? (
                            <Popover
                              content={
                                <Select
                                  defaultValue={tournament.campaignStatus}
                                  onChange={(newStatus) =>
                                    handleStatusChange(tournament.id, newStatus)
                                  }
                                  style={{ width: 120 }}
                                >
                                  {statusOptions.map((status) => (
                                    <Option key={status} value={status}>
                                      {status}
                                    </Option>
                                  ))}
                                </Select>
                              }
                              title="Change Status"
                              trigger="click"
                            >
                              <Button className="border px-4 py-1 rounded-lg text-white bg-orange-500 cursor-pointer">
                                {tournament.campaignStatus}
                              </Button>
                            </Popover>
                          ) : (
                            <div className="border px-4 py-1 rounded-lg text-white bg-orange-500 cursor-normal">
                              {tournament.campaignStatus}
                            </div>
                          )}

                          <p className="text-md mx-4">
                            {moment(tournament.startDate).format("DD-MM-YYYY")}{" "}
                            - {moment(tournament.endDate).format("DD-MM-YYYY")}
                          </p>
                          <p>
                            Registration deadline{" "}
                            {moment(tournament.registrationExpiredDate).format(
                              "DD-MM-YYYY"
                            )}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>
          ) : (
            <div className="flex flex-wrap flex-col items-center">
              {Array.isArray(tournaments) &&
                tournaments
                  .filter((tournament) => {
                    return search.toLowerCase() === ""
                      ? tournament
                      : tournament.tournamentName
                          .toLowerCase()
                          .includes(search.toLowerCase());
                  })
                  .map((tournament) => (
                    <div key={tournament.id}>
                      <div className="flex flex-wrap xl:flex-nowrap items-center justify-between rounded-lg gap-6 border-2 w-full xl:w-[1008px] h-auto bg-white border-solid my-[16px] p-4">
                        <Link to={`/tournamentDetail/${tournament.id}`}>
                          <div className="flex items-center justify-between">
                            <img
                              className="w-[156px] h-[156px] m-[16px] flex-shrink-0"
                              src={
                                tournament.imageUrl
                                  ? tournament.imageUrl
                                  : defaultImg
                              }
                              alt={tournament.id}
                            />
                            <div className="flex-1">
                              <p className="my-[16px] font-bold text-3xl">
                                {tournament.tournamentName}
                              </p>

                              <p className="text-md">
                                {moment(tournament.startDate).format(
                                  "DD-MM-YYYY"
                                )}{" "}
                                -{" "}
                                {moment(tournament.endDate).format(
                                  "DD-MM-YYYY"
                                )}{" "}
                                <p>
                                  Registration deadline:{" "}
                                  {moment(
                                    tournament.registrationExpiredDate
                                  ).format("DD-MM-YYYY")}
                                </p>
                              </p>
                            </div>
                          </div>
                        </Link>

                        {userRole === "Manager" ? (
                          <Popover
                            content={
                              <Select
                                defaultValue={tournament.campaignStatus}
                                onChange={(newStatus) =>
                                  handleStatusChange(tournament.id, newStatus)
                                }
                                style={{ width: 120 }}
                              >
                                {statusOptions.map((status) => (
                                  <Option key={status} value={status}>
                                    {status}
                                  </Option>
                                ))}
                              </Select>
                            }
                            title="Change Status"
                            trigger="click"
                          >
                            <Button className="border px-4 py-1 rounded-lg text-white bg-orange-500 cursor-pointer">
                              {tournament.campaignStatus}
                            </Button>
                          </Popover>
                        ) : (
                          <div className="border px-4 py-1 rounded-lg text-white bg-orange-500 cursor-normal">
                            {tournament.campaignStatus}
                          </div>
                        )}

                        {userRole === "Athlete" && (
                          <Button
                            className="bg-violet-500 text-white hover:scale-150 mr-4"
                            onClick={() => handleRegister(tournament.id)}
                          >
                            Register
                          </Button>
                        )}
                        {userRole !== "Athlete" && userRole !== "Manager" && (
                          <Button
                            className="bg-violet-500 text-white hover:scale-150 mr-4"
                            onClick={() =>
                              handleGuestRegistration(tournament.id)
                            }
                          >
                            Register
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
        <div className="flex justify-center my-4 pb-6">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalItemsCount}
            onChange={handlePageChange}
          />
        </div>
      </div>
      {open && (
        <SignUp
          show={open}
          tournamentId={tournamentId}
          closePopup={handleClose}
        ></SignUp>
      )}
    </div>
  );
};

export default Tournament;
