import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../styles/Bracket.css";
import AddParticiPant from "../components/AddParticiPant";
import AddTeam from "../components/AddTeam";
import tourbg from "../images/tournament-bg.png";

const Bracket = () => {
  const [data, setData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { tournamentId } = useParams();
  const URL = `http://localhost:5000/api/pickleball-match/${tournamentId}`;
  const { id } = useParams();
  const location = useLocation();
  const { formatType } = location.state || {};
  console.log(formatType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(URL);
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tournamentId]);
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
    if (match.roundOrder === 1) {
      setSelectedMatch(match);
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
        (formatType === "MenSingles" || formatType === "WomenSingles") && (
          <AddParticiPant match={selectedMatch} closePopup={closePopup} />
        )}

      {selectedMatch &&
        (formatType === "MenDual" ||
          formatType === "WomenDual" ||
          formatType === "DualMixed") && (
          <AddTeam match={selectedMatch} closePopup={closePopup} />
        )}
    </div>
  );
};

export default Bracket;
