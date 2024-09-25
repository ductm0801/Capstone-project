import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultImg from "../images/defaultImg.png";
import CreateTournamentFormat from "./CreateTournamentFormat";
import { jwtDecode } from "jwt-decode";
import { Button, Empty, message } from "antd";
import { FaUser } from "react-icons/fa";
import TournamentRegist from "./TournamentRegist";

const FormatType = ({ tournamentId, campaign }) => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);
  const { id } = useParams();
  const URL = "https://nhub.site/api/tournament/campaign";
  const URL2 = "https://nhub.site/api/tournament-registration/user";
  const navigate = useNavigate();

  const handleRegister = async (id) => {
    try {
      const res = await axios.post(
        `${URL2}/?tournamentId=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        message.success("Registration successful!");
      }
    } catch (error) {
      message.error(
        error.response?.data || "Failed to register. Please try again."
      );
    }
  };

  const handleGuestRegistration = (tournamentId) => {
    setOpen(true);
    setSelectedTournamentId(tournamentId);
  };

  const URL3 = `https://nhub.site/api/pickleball-match`;
  const handleTournamentClick = async (tournament) => {
    setSelectedTournament(tournament);
    try {
      const res = await axios.get(`${URL3}/${tournament.tournamentId}`);
      if (res.status === 200) {
        setData(res.data);
        if (tournament.tournamentType === "Elimination") {
          navigate(`/bracket/${tournament.tournamentId}`, {
            state: {
              formatType: tournament.formatType,
              tournamentId: id,
              data: res.data,
              campaign: campaign,
            },
          });
        } else if (tournament.tournamentType === "GroupStage") {
          navigate(`/roundGroup/${tournament.tournamentId}`, {
            state: {
              formatType: tournament.formatType,
              tournamentId: id,
              campaign: campaign,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error fetching tournament data:", error);
    }
  };
  const getAllTournament = async () => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      if (res.status === 200) {
        setTournaments(res.data);
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };
  const handleAddButtonClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    getAllTournament();
  }, [tournaments.length]);

  return (
    <div>
      <div className="bg-[#EFEFEF] py-[48px] px-[16px] sm:px-[48px] md:px-[96px] lg:px-[216px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <div key={tournament.tournamentId}>
              <div className="flex flex-col max-w-[488px] hover:bg-white group hover:rounded-lg">
                <img
                  src={tournament.imageUrl ? tournament.imageUrl : defaultImg}
                  alt={tournament.tournamentId}
                  className="max-w-[488px] min-h-[366px]"
                  onClick={() => handleTournamentClick(tournament)}
                />

                <div>
                  <h1 className="text-3xl font-bold ml-4 group-hover:text-[#C6C61A] flex items-center gap-2 ">
                    {tournament.tournamentName} -{" "}
                    {tournament.currentParticipants}/
                    {tournament.requiredAthletesNumber}
                    <FaUser />
                  </h1>
                  <div className="font-semibold ml-6">
                    {" "}
                    Type : {tournament.formatType} ,{tournament.tournamentType}{" "}
                    <br />
                    Number of Sets: {tournament.numberOfSets}
                  </div>
                  {userRole !== "Manager" && (
                    <div className="ml-4 pb-4">
                      {userRole === "Athlete" ? (
                        <Button
                          className="bg-violet-500 text-white  mr-4"
                          onClick={() =>
                            handleRegister(tournament.tournamentId)
                          }
                        >
                          Register
                        </Button>
                      ) : (
                        <Button
                          className="bg-violet-500 text-white  mr-4"
                          onClick={() =>
                            handleGuestRegistration(tournament.tournamentId)
                          }
                        >
                          Register
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center w-[80vw]">
            <Empty />
          </div>
        )}
      </div>
      {userRole === "Manager" && (
        <button className="add-button" onClick={handleAddButtonClick}>
          +
        </button>
      )}
      <CreateTournamentFormat
        show={showPopup}
        handleClose={handleClosePopup}
        onSave={getAllTournament}
      ></CreateTournamentFormat>
      {open && (
        <TournamentRegist
          show={open}
          handleClose={() => setOpen(false)}
          tournamentId={selectedTournamentId}
        />
      )}
    </div>
  );
};

export default FormatType;
