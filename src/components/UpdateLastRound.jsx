import React, { useEffect, useState } from "react";
import "../styles/AddParticipant.css";
import popImg from "../images/addparticipant.png";
import { toast } from "react-toastify";
import axios from "axios";
import { message, Radio, Select } from "antd";

const initialState = {
  matchId: "",
  winningTeamId: "",
  winConditionId: "",
};

const UpdateLastRound = ({ match, closePopup, onSave }) => {
  const [options, setOptions] = useState([]);
  const [state, setState] = useState({
    ...initialState,
    matchId: match.matchId,
  });

  const { winningTeamId, winConditionId } = state;
  const URL3 =
    "https://pickleball-agdwcrbacmaea5fg.eastus-01.azurewebsites.net/api/win-condition";
  const URL2 =
    "https://pickleball-agdwcrbacmaea5fg.eastus-01.azurewebsites.net/api/pickleball-match/match-result";

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      matchId: state.matchId,
      winningTeamId,
      winConditionId,
    };
    try {
      const res = await axios.put(`${URL2}/${match.matchId}`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("Updated Winning Team successfully");
        onSave();
        closePopup();
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const fetchOptions = async () => {
    try {
      const res = await axios.get(URL3);
      if (res.status === 200) {
        const formattedOptions = res.data.data.map((option) => ({
          label: option.conditionName,
          value: option.winConditionId,
        }));
        setOptions(formattedOptions);
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleTeamChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      winningTeamId: e.target.value,
    }));
  };

  const handleWinConditionChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      winConditionId: value,
    }));
  };

  return (
    <div className="popup">
      <div className="bg-white rounded-lg flex flex-col items-center justify-center">
        <div
          className="w-[592px] h-[98px] mb-[44px] rounded-t-lg justify-center flex items-center text-white text-3xl font-bold"
          style={{
            background: `url(${popImg})`,
          }}
        >
          Update Last Round
        </div>
        <p>Round: {match.roundOrder}</p>
        <p>Match Order: {match.matchOrder}</p>
        <p>First Team: {match.firstTeam || "?"}</p>
        <p>Second Team: {match.secondTeam || "?"}</p>

        <div className="flex flex-col w-full items-center mt-6">
          <div className="form-group mb-4 w-full flex flex-col items-center">
            <label className="mb-2 font-bold" htmlFor="winningTeam">
              Select Winning Team <span className="text-red-500">*</span>
            </label>
            <Radio.Group
              options={[
                { label: match.firstTeam, value: match.firstTeamId },
                { label: match.secondTeam, value: match.secondTeamId },
              ]}
              value={winningTeamId}
              onChange={handleTeamChange}
              className="w-full flex justify-center"
            />
            <Select
              className="w-[180px] mt-2"
              placeholder="Select Win Condition"
              options={options}
              value={winConditionId}
              onChange={handleWinConditionChange}
            />
          </div>
        </div>

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

export default UpdateLastRound;
