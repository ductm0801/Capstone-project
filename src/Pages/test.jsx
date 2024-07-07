import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/test.css";
import AddParticiPant from "../components/AddParticiPant";
import tourbg from "../images/tournament-bg.png";

const Test = () => {
  const [data, setData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null); // State for selected match
  const { tournamentId } = useParams(); // Capture the tournamentId from URL parameters
  const URL = `http://localhost:5000/api/pickleball-match/${tournamentId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(URL);
        if (res.status === 200) {
          setData(res.data);
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tournamentId]);

  const matchesByRound = data.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {});

  const rounds = [
    ...Object.keys(matchesByRound),
    ...Object.keys(matchesByRound).slice(0, -1).reverse(),
  ];

  const handleMatchClick = (match) => {
    if (match.round === "Round 1") {
      setSelectedMatch(match); // Set the selected match for the popup
    }
  };

  const closePopup = () => {
    setSelectedMatch(null); // Close the popup
  };

  return (
    <div className="tournament-container">
      <div
        className="tournament-brackets pt-[300px]"
        style={{
          background: `url(${tourbg})`,
          backgroundRepeat: "no-repeat",
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
                  {[
                    "Round 1",
                    "Round 2",
                    "Round 3",
                    "Round 4",
                    "Round 5",
                    "Round 6",
                    "Round 7",
                    "Round 8",
                    "Round 9",
                    "Round 10",
                  ].includes(match.round) ? (
                    match.winningTeam ? (
                      <div className="border-2 rounded-lg mb-2">
                        {match.winningTeam}
                      </div>
                    ) : (
                      <div>
                        <div className="border-2 bg-white rounded-lg mb-2">
                          {match.firstTeam || "?"}
                        </div>
                        <div className="border-2 bg-white rounded-lg mb-2">
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

      {selectedMatch && (
        <AddParticiPant match={selectedMatch} closePopup={closePopup} />
      )}
    </div>
  );
};

export default Test;
