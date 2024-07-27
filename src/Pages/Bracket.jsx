import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../styles/Bracket.css";
import AddParticiPant from "../components/AddParticiPant";
import AddTeam from "../components/AddTeam";
import UpdateWinningTeam from "../components/UpdateWinningTeam";
import tourbg from "../images/tournament-bg.png";
import { jwtDecode } from "jwt-decode";

const Bracket = () => {
  const [data, setData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { bracketId } = useParams();
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const URL = `http://localhost:5000/api/pickleball-match`;

  const location = useLocation();
  const { formatType } = location.state || {};
  const { tournamentId } = location.state || {};
  console.log(tournamentId, formatType);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      setUserRole(
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${URL}/${bracketId}`);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

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
    if (match.roundOrder === 1) {
      setSelectedMatch(match);
    } else if (match.roundOrder !== 1) {
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

  const paddingLeft = data.length === 63 ? "350px" : "0";
  return (
    <div
      className="tournament-container"
      style={{
        background: `url(${tourbg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        paddingLeft: paddingLeft,
      }}
    >
      <div
        className="tournament-brackets pt-[300px]"
        style={{
          background: `url(${tourbg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
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
                  {[1, 2, 3, 4, 5, 6].includes(match.roundOrder) ? (
                    match.winningTeam ? (
                      <div className="border-2 rounded-lg mb-2">
                        {match.winningTeam}
                      </div>
                    ) : (
                      <div>
                        <div className="border-2 bg-white rounded-lg mb-2 cursor-pointer team-order">
                          {match.firstTeam || "?"}
                        </div>
                        <div className="border-2 bg-white rounded-lg mb-2 cursor-pointer team-order">
                          {match.secondTeam || "?"}
                        </div>
                      </div>
                    )
                  ) : null}
                </li>
              ))}
            </ul>
          );
        })}
      </div>

      {selectedMatch &&
        (formatType === "MenSingles" || formatType === "WomenSingles") &&
        selectedMatch.roundOrder === 1 && (
          <AddParticiPant
            match={selectedMatch}
            closePopup={closePopup}
            tournamentId={tournamentId}
            bracketId={bracketId}
            onSave={fetchData}
            loading={loading}
          />
        )}

      {selectedMatch &&
        (formatType === "MenDual" ||
          formatType === "WomenDual" ||
          formatType === "DualMixed") &&
        selectedMatch.roundOrder === 1 && (
          <AddTeam
            match={selectedMatch}
            closePopup={closePopup}
            tournamentId={tournamentId}
            bracketId={bracketId}
            onSave={fetchData}
            loading={loading}
          />
        )}

      {selectedMatch && selectedMatch.roundOrder !== 1 && (
        <UpdateWinningTeam
          match={selectedMatch}
          closePopup={closePopup}
          tournamentId={tournamentId}
          bracketId={bracketId}
          onSave={fetchData}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Bracket;
