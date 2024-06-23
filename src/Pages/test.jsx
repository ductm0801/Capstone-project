import "../styles/test.css";

function generateFakeData(maxRound) {
  const teams = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const data = [];
  let currentRound = 1;
  let teamCount = Math.pow(2, maxRound);

  // Initialize the first round matches
  for (let i = 0; i < teamCount / 2; i++) {
    data.push({
      Team1Id: teams[Math.floor(Math.random() * 26) + 1],
      Team2Id: teams[Math.floor(Math.random() * 6)],
      WinningTeam: teams[Math.floor(Math.random() * 6)],
      Round: String(currentRound),
    });
  }

  // Generate subsequent rounds up to but not including the last round
  while (currentRound < maxRound) {
    currentRound++;
    const previousRoundMatches = data.filter(
      (match) => match.Round === String(currentRound - 1)
    );
    for (let i = 0; i < previousRoundMatches.length / 2; i++) {
      const team1 = previousRoundMatches[i * 2].WinningTeam;
      const team2 = previousRoundMatches[i * 2 + 1].WinningTeam;

      data.push({
        Team1Id: team1,
        Team2Id: team2,
        // WinningTeam: [team1, team2][Math.floor(Math.random() * 2)],
        Round: String(currentRound),
      });
    }
  }

  return data;
}
let data = [
  { Team1Id: "C", Team2Id: "D", WinningTeam: "C", Round: "1" },

  { Team1Id: "E", Team2Id: "F", WinningTeam: "E", Round: "1" },

  { Team1Id: "G", Team2Id: "H", WinningTeam: "G", Round: "1" },

  { Team1Id: "J", Team2Id: "K", WinningTeam: "J", Round: "1" },

  { Team1Id: "", Team2Id: "", WinningTeam: "", Round: "1" },

  { Team1Id: "", Team2Id: "", WinningTeam: "", Round: "1" },

  { Team1Id: "", Team2Id: "", WinningTeam: "", Round: "1" },

  { Team1Id: "", Team2Id: "", WinningTeam: "", Round: "1" },

  { Team1Id: "C", Team2Id: "E", WinningTeam: "C", Round: "2" },

  { Team1Id: "", Team2Id: "", WinningTeam: "", Round: "2" },

  { Team1Id: "", Team2Id: "", WinningTeam: "", Round: "2" },

  { Team1Id: "M", Team2Id: "N", WinningTeam: "", Round: "2" },

  { Team1Id: "E", Team2Id: "F", WinningTeam: "F", Round: "3" },

  { Team1Id: "I", Team2Id: "L", WinningTeam: "I", Round: "3" },

  { Team1Id: "", Team2Id: "", WinningTeam: "", Round: "4" },
];
console.log(data); // MIN: 2 -> 2^2 | MAX: 8 -> 2^8

function Test() {
  // {1: arrRound1, 2: arrRound2, 3:arrRound3...}
  const matchesByRound = data.reduce((acc, match) => {
    if (!acc[match.Round]) {
      acc[match.Round] = [];
    }
    acc[match.Round].push(match);
    return acc;
  }, {});
  // Handle to: roundeds = [1,2,3,2,1]
  const rounds = [
    ...Object.keys(matchesByRound),
    ...Object.keys(matchesByRound).slice(0, -1).reverse(),
  ];

  return (
    <>
      <div className="tournament-container px-2">
        <div className="tournament-brackets  bg-[#fdfdfd] mb-[50px]">
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
                  >
                    {match.Round === "1" ||
                    match.Round === "2" ||
                    match.Round === "3" ||
                    match.Round === "4" ? (
                      match.WinningTeam ? (
                        <div className="border-2 rounded-lg mb-2">
                          {match.WinningTeam}
                        </div>
                      ) : (
                        <div>
                          <div className="border-2 rounded-lg mb-2">
                            {match.Team1Id || "?"}
                          </div>
                          <div className="border-2 rounded-lg mb-2">
                            {match.Team2Id || "?"}
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
      </div>
    </>
  );
}

export default Test;
