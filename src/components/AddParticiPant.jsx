import React, { useEffect, useState } from "react";
import "../styles/AddParticipant.css";
import popImg from "../images/addparticipant.png";
import { toast } from "react-toastify";
import axios from "axios";
import { message, Select } from "antd";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstAthleteId: 0,
  secondAthleteId: 0,
};

const errorInit = {
  firstAthleteId_err: "",
  secondAthleteId_err: "",
};

const AddParticipant = ({
  match,
  closePopup,
  tournamentId,
  onSave,
  bracketId,
  onSave2,
}) => {
  const [participants, setParticipants] = useState([]);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(errorInit);
  const { firstAthleteId, secondAthleteId } = state;
  const navigate = useNavigate();
  const URL = "https://apis-pickleball.somee.com/api/athletes/non-teams";
  const URL2 =
    "https://apis-pickleball.somee.com/api/pickleball-match/assign-single-team";

  const getParticipants = async () => {
    try {
      const res = await axios.get(`${URL}/${bracketId}`);
      const { success, message } = res.data;
      if (res.status === 200) {
        setParticipants(res.data);
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  const options = participants.map((participant) => ({
    label: `${participant.athleteName} (${participant.athleteType})`,
    value: participant.id,
  }));

  const handleSave = async (e) => {
    e.preventDefault();
    assignParticipants(state);
    // navigate(`/bracket/${bracketId}`);
  };

  const assignParticipants = async (data) => {
    try {
      const res = await axios.put(`${URL2}/${match.matchId}`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("Participants assigned successfully");
        onSave();
        onSave2();
        closePopup();
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const handleInputChange = (value, fieldName) => {
    setState((prevState) => ({
      ...prevState,
      [fieldName]: value,
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
          Single
        </div>
        <p>Round: {match.roundOrder}</p>
        <p>Match Order: {match.matchOrder}</p>
        <p>First Team: {match.firstTeam || "?"}</p>
        <p>Second Team: {match.secondTeam || "?"}</p>

        <div className="flex flex-col w-full items-center mt-6">
          <div className="form-group mb-2 flex flex-col text-left">
            <label className="mb-1" htmlFor="firstAthleteId">
              First Team Participant <span className="text-red-500">*</span>
            </label>
            <Select
              showSearch
              placeholder="First Participant"
              optionFilterProp="label"
              options={options}
              onChange={(value) => handleInputChange(value, "firstAthleteId")}
              className="w-[180px]"
            />
            {errors.firstAthleteId_err && (
              <span className="error">{errors.firstAthleteId_err}</span>
            )}
          </div>
          <div className="form-group mb-2 flex flex-col text-left">
            <label className="mb-1" htmlFor="secondAthleteId">
              Second Team Participant <span className="text-red-500">*</span>
            </label>
            <Select
              showSearch
              placeholder="Second Participant"
              optionFilterProp="label"
              options={options}
              onChange={(value) => handleInputChange(value, "secondAthleteId")}
              className="w-[180px]"
            />
            {errors.secondAthleteId_err && (
              <span className="error">{errors.secondAthleteId_err}</span>
            )}
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

export default AddParticipant;
