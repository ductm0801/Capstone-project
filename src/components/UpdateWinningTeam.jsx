import React, { useEffect, useState } from "react";
import "../styles/AddParticipant.css";
import popImg from "../images/addparticipant.png";
import { toast } from "react-toastify";
import axios from "axios";
import { Radio, Select } from "antd";

const initialState = {
  matchId: "",
  winningFirstTeamId: 0,
  winningSecondTeamId: 0,
  firstMatchWinConditionId: "",
  secondMatchWinConditionId: "",
};

const UpdateWinningTeam = ({ match, closePopup, onSave }) => {
  const [firstTeamParticipants, setFirstTeamParticipants] = useState([]);
  const [secondTeamParticipants, setSecondTeamParticipants] = useState([]);
  const [options, setOptions] = useState([]);
  const [state, setState] = useState({
    ...initialState,
    matchId: match.matchId,
  });
  const {
    winningFirstTeamId,
    winningSecondTeamId,
    firstMatchWinConditionId,
    secondMatchWinConditionId,
  } = state;
  const URL3 = "http://localhost:5000/api/win-condition";
  const URL2 = "http://localhost:5000/api/pickleball-match/next-match";
  const URL = `http://localhost:5000/api/pickleball-match/advanced-match/${match.matchId}`;

  const getOptions = (participants) =>
    participants.map((participant) => ({
      label: participant.teamName,
      value: participant.teamId,
    }));

  const handleSave = async (e) => {
    e.preventDefault();
    updateWinningTeam({
      matchId: state.matchId,
      firstTeamId: winningFirstTeamId,
      secondTeamId: winningSecondTeamId,
      firstMatchWinConditionId,
      secondMatchWinConditionId,
    });
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
      toast.error("Failed to fetch options");
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const updateWinningTeam = async (data) => {
    try {
      const res = await axios.put(`${URL2}/${match.matchId}`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("Update Winning Team successfully");
        onSave();
        closePopup();
      }
    } catch (error) {
      toast.error("Failed to Update");
      console.error("Error Update:", error);
    }
  };

  const getPreviousTeam = async () => {
    try {
      const res = await axios.get(URL);
      if (res.status === 200) {
        const firstTeams = res.data.firstTeams || [];
        const secondTeams = res.data.secondTeams || [];
        setFirstTeamParticipants(firstTeams);
        setSecondTeamParticipants(secondTeams);
      }
    } catch (error) {
      toast.error("Failed to fetch participants");
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    getPreviousTeam();
  }, []);

  const handleFirstTeamChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      winningFirstTeamId: e.target.value,
    }));
  };

  const handleSecondTeamChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      winningSecondTeamId: e.target.value,
    }));
  };

  const handleFirstWinConditionChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      firstMatchWinConditionId: value,
    }));
  };

  const handleSecondWinConditionChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      secondMatchWinConditionId: value,
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
          Update Winning Team
        </div>
        <p>Round: {match.roundOrder}</p>
        <p>Match Order: {match.matchOrder}</p>
        <p>First Team: {match.firstTeam || "?"}</p>
        <p>Second Team: {match.secondTeam || "?"}</p>

        <div className="flex flex-col w-full items-center mt-6">
          <div className="form-group mb-4 w-full flex flex-col items-center">
            <label className="mb-2 font-bold" htmlFor="firstTeam">
              Select First Winning Team <span className="text-red-500">*</span>
            </label>
            <Radio.Group
              options={getOptions(firstTeamParticipants)}
              value={winningFirstTeamId}
              defaultValue={0}
              onChange={handleFirstTeamChange}
              className="w-full flex justify-center"
            />
            <Select
              className="w-[180px] mt-2"
              placeholder="Select Win Condition"
              options={options}
              value={firstMatchWinConditionId}
              onChange={handleFirstWinConditionChange}
            />
          </div>
          <div className="form-group mb-4 w-full flex flex-col items-center">
            <label className="mb-2 font-bold" htmlFor="secondTeam">
              Select Second Winning Team <span className="text-red-500">*</span>
            </label>
            <Radio.Group
              options={getOptions(secondTeamParticipants)}
              value={winningSecondTeamId}
              defaultValue={0}
              onChange={handleSecondTeamChange}
              className="w-full flex justify-center"
            />

            <Select
              className="w-[180px] mt-2"
              placeholder="Select Win Condition"
              options={options}
              value={secondMatchWinConditionId}
              onChange={handleSecondWinConditionChange}
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

export default UpdateWinningTeam;
