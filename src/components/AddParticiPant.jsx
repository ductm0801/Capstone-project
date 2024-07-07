import React, { useState } from "react";
import "../styles/AddParticipant.css";
import popImg from "../images/addparticipant.png";

const AddParticipant = ({ match, closePopup }) => {
  const [firstTeamInput, setFirstTeamInput] = useState("");
  const [secondTeamInput, setSecondTeamInput] = useState("");
  const [showInputs, setShowInputs] = useState(
    !match.firstTeam && !match.secondTeam
  );

  const handleSave = () => {
    console.log("First Team:", firstTeamInput);
    console.log("Second Team:", secondTeamInput);
    closePopup();
  };

  return (
    <div className="popup">
      <div className="bg-white rounded-lg flex flex-col items-center justify-center">
        <h2
          className="w-[592px] h-[98px] mb-[44px] rounded-t-lg justify-center flex items-center text-white text-3xl font-bold"
          style={{
            background: `url(${popImg})`,
          }}
        >
          Single
        </h2>
        <p>Round: {match.round}</p>
        <p>Match Order: {match.matchOrder}</p>
        <p>First Team: {match.firstTeam || "?"}</p>
        <p>Second Team: {match.secondTeam || "?"}</p>

        {showInputs && (
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter First Team"
              value={firstTeamInput}
              onChange={(e) => setFirstTeamInput(e.target.value)}
              className="mb-4 px-4 py-2 border-2 border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Enter Second Team"
              value={secondTeamInput}
              onChange={(e) => setSecondTeamInput(e.target.value)}
              className="mb-4 px-4 py-2 border-2 border-gray-300 rounded-lg"
            />
          </div>
        )}

        <div className="flex justify-center gap-2">
          <button
            className="text-l mb-[32px] mt-[16px] px-14 py-2 border-2 border-blue-500 rounded-lg text-blue-500 font-bold"
            onClick={closePopup}
          >
            Back
          </button>
          <button
            className="text-l mb-[32px] mt-[16px] px-14 py-2 border-2 border-[#C6C61A] bg-[#C6C61A] rounded-lg text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParticipant;
