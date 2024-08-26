import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultImg from "../images/defaultImg.png";
import CreateTournamentFormat from "./CreateTournamentFormat";
import { jwtDecode } from "jwt-decode";
import { Button, message } from "antd";

const FormatType = ({ tournamentId }) => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);
  const { id } = useParams();
  const URL = "http://localhost:5000/campaign";
  const URL2 = "http://localhost:5000/api/tournament-registration/user";
  const navigate = useNavigate();
  console.log(tournamentId);

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

      message.success("Registration successful!");
      // console.log("Response:", res.data);
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to register. Please try again.");
    }
  };

  const handleTournamentClick = (tournament) => {
    console.log(tournament.formatType);
    setSelectedTournament(tournament);
    // if (userRole === "Manager") {
    //   navigate(`/addParticipants/${tournament.tournamentId}`, {
    //     state: {
    //       formatType: tournament.formatType,
    //       tournamentId: id,
    //     },
    //   });
    // } else if (userRole === "Athlete" || !userRole) {
    //   navigate(`/bracket/${tournament.tournamentId}`, {
    //     state: {
    //       formatType: tournament.formatType,
    //       tournamentId: id,
    //     },
    //   });
    // }
    if (tournament.tournamentType === "Elimination") {
      navigate(`/bracket/${tournament.tournamentId}`, {
        state: {
          formatType: tournament.formatType,
          tournamentId: id,
        },
      });
    } else if (tournament.tournamentType === "GroupStage") {
      navigate(`/roundGroup/${tournament.tournamentId}`, {
        state: {
          formatType: tournament.formatType,
          tournamentId: id,
        },
      });
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
                  src={tournament.img ? tournament.img : defaultImg}
                  alt={tournament.tournamentId}
                  className="max-w-[488px] min-h-[366px]"
                  onClick={() => handleTournamentClick(tournament)}
                />
                <div>
                  <h1 className="text-3xl font-bold ml-4 group-hover:text-[#C6C61A]">
                    {tournament.tournamentName}
                  </h1>
                  <div className="ml-4 pb-4">
                    {userRole === "Athlete" ? (
                      <Button
                        className="bg-violet-500 text-white  mr-4"
                        onClick={() => handleRegister(tournament.tournamentId)}
                      >
                        Register
                      </Button>
                    ) : (
                      !userRole && (
                        <Button
                          className="bg-violet-500 text-white  mr-4"
                          onClick={() => setOpen(true)}
                        >
                          Register
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
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
    </div>
  );
};

export default FormatType;
