import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/Bracket.css";
import AddParticiPant from "../components/AddParticiPant";
import AddTeam from "../components/AddTeam";
import UpdateWinningTeam from "../components/UpdateWinningTeam";
import tourbg from "../images/tournament-bg.png";
import { jwtDecode } from "jwt-decode";
import { Button, message } from "antd";
import UpdateLastRound from "../components/UpdateLastRound";
import Schedule from "../components/Schedule";
import AddParticipantGroup from "../components/AddParticipantGroup";
import ScheduleRound from "../components/ScheduleRound";

const RoundBracket = () => {
  const [data, setData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { bracketId } = useParams();
  const [match, setMatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [lastRound, setLastRound] = useState(false);
  const URL = `http://localhost:5000/api/pickleball-match/next-rounds-match`;

  const location = useLocation();
  const { formatType } = location.state || {};
  const { tournamentId } = location.state || {};
  // const { data } = location.state || [];
  const { roundId } = location.state || [];
  const { round2Id } = location.state || [];

  useEffect(() => {
    const role = localStorage.getItem("role");

    setUserRole(role);
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/pickleball-match/next-rounds-match/${bracketId}`
      );
      if (res.status === 200) {
        setData(res.data);
        setMatch(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(`${URL}/${bracketId}`);
  //     if (res.status === 200) {
  //       setData(res.data);
  //       setMatch(res.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  const onLastRound = () => {
    setLastRound(true);
  };
  const closeLastRound = () => {
    setLastRound(false);
    setSelectedMatch(null);
  };

  const matchesByRound = data.reduce((acc, match) => {
    if (!acc[match.roundOrder]) {
      acc[match.roundOrder] = [];
    }
    acc[match.roundOrder].push(match);
    return acc;
  }, {});

  const rounds = [
    ...Object.keys(matchesByRound),
    ...Object.keys(matchesByRound).slice(0, -1).reverse(),
  ];

  const handleMatchClick = (match) => {
    if (userRole !== "Manager") return;

    const previousRoundMatches = matchesByRound[match.roundOrder - 1] || [];
    if (match.roundOrder === 2) {
      setSelectedMatch(match);
    } else if (match.roundOrder !== 2) {
      const PreviousMatchesHaveFirstTeamId = previousRoundMatches.find(
        (m) => m.firstTeamId
      );
      if (PreviousMatchesHaveFirstTeamId) {
        setSelectedMatch(match);
      } else {
        setSelectedMatch(null);
      }
    }
  };

  const closePopup = () => {
    setSelectedMatch(null);
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/roundGroup/${bracketId}`);
  };

  const paddingLeft = data.length === 63 ? "350px" : "0";
  return (
    <div
      style={{
        paddingLeft: paddingLeft,
      }}
      className="mt-[80px]"
    >
      <div>
        <div
          className="tournament-brackets pt-[300px]"
          style={{
            background: `url(${tourbg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute top-[100px] left-10">
            <Button
              className="bg-blue-700 text-lg mt-4 py-[23px] px-6 text-white"
              onClick={() => handleBack()}
            >
              Back
            </Button>
          </div>
          {rounds.map((round, index) => {
            let matches = matchesByRound[round];
            const position = index < rounds.length / 2 ? "left" : "right";
            const halfLength = Math.ceil(matches.length / 2);
            if (position === "left") {
              matches = matches.slice(0, halfLength);
            } else {
              matches = matches.slice(halfLength);
            }

            return (
              <ul
                key={index}
                className={`bracket bracket-${round} ${
                  +round === Math.max(...rounds) - 1
                    ? "after:[&>*:nth-of-type(odd)]:!h-0"
                    : ""
                } `}
              >
                {matches.map((match, idx) => (
                  <li
                    key={idx}
                    className={`team-item item-${
                      Math.max(...rounds) === +round ? "mid" : position
                    }`}
                    onClick={() => handleMatchClick(match)}
                  >
                    {Math.max(...rounds) === +round ? (
                      <div className="mb-2">
                        <div className="border-2 w-full bg-white rounded-lg mb-2 cursor-pointer team-order">
                          {match.firstTeam || "?"}
                        </div>
                        <div
                          className="!border-0 !bg-gradient-to-br from-[#FFD79B] to-[#E3A835] w-full rounded-lg mb-2 cursor-pointer team-order !text-blue-500"
                          onClick={() => onLastRound()}
                        >
                          {match.winningTeam || "?"}
                        </div>
                        <div className="border-2 bg-white w-full rounded-lg mb-2 cursor-pointer team-order">
                          {match.secondTeam || "?"}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-2">
                        <div className="border-2 bg-white rounded-lg mb-2 cursor-pointer team-order">
                          {match.firstTeam || "?"}
                        </div>
                        <div className="border-2 bg-white rounded-lg mb-2 cursor-pointer team-order">
                          {match.secondTeam || "?"}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            );
          })}
        </div>

        {selectedMatch &&
          lastRound === false &&
          selectedMatch.roundOrder === 2 && (
            <AddParticipantGroup
              match={selectedMatch}
              closePopup={closePopup}
              roundId={roundId}
              round2Id={round2Id}
              bracketId={bracketId}
              onSave={fetchMatches}
              loading={loading}
            />
          )}

        {/* {selectedMatch &&
          lastRound === false &&
          (formatType === "MenDual" ||
            formatType === "WomenDual" ||
            formatType === "DualMixed") &&
          selectedMatch.roundOrder === 2 && (
            <AddTeam
              match={selectedMatch}
              closePopup={closePopup}
              roundId={roundId}
              bracketId={bracketId}
              onSave={fetchData}
              loading={loading}
            />
          )} */}

        {/* {selectedMatch &&
          selectedMatch.roundOrder !== 2 &&
          lastRound === false && (
            <UpdateWinningTeam
              match={selectedMatch}
              closePopup={closePopup}
              tournamentId={tournamentId}
              bracketId={bracketId}
              onSave={fetchData}
              loading={loading}
            />
          )} */}
        {/* {selectedMatch && selectedMatch.roundOrder !== 2 && lastRound && (
          <UpdateLastRound
            match={selectedMatch}
            closePopup={closeLastRound}
            tournamentId={tournamentId}
            bracketId={bracketId}
            onSave={fetchData}
            loading={loading}
          />
        )} */}
      </div>
      <div>
        <ScheduleRound match={match} onSave3={fetchMatches} />
      </div>
    </div>
  );
};

export default RoundBracket;
