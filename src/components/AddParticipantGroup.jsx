import React, { useEffect, useState } from "react";
import "../styles/AddParticipant.css";
import popImg from "../images/addparticipant.png";
import { toast } from "react-toastify";
import axios from "axios";
import { message, Select } from "antd";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstTeamId: 0,
  secondTeamId: 0,
};

const errorInit = {
  firstTeam_err: "",
  secondTeam_err: "",
};

const AddParticipantGroup = ({
  match,
  closePopup,
  roundId,
  onSave,
  bracketId,
  onSave2,
  round2Id,
}) => {
  const [participants, setParticipants] = useState([]);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(errorInit);
  const { firstTeamId, secondTeamId } = state;
  const navigate = useNavigate();
  const URL = "https://apis-pickleball.somee.com/non-match-teams";
  const URL2 =
    "https://apis-pickleball.somee.com/api/pickleball-match/assign-teams";

  const getParticipants = async () => {
    try {
      const res = await axios.get(`${URL}/${round2Id}`);
      const { success, message } = res.data;
      if (res.status === 200) {
        setParticipants(res.data);
      }
    } catch (error) {
      message.error(error.response.data);
      console.log("aaa");
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  const options = participants.map((participant) => ({
    label: `${participant.teamName}`,
    value: participant.teamId,
  }));

  const handleSave = async (e) => {
    e.preventDefault();
    assignParticipants(state);
    // navigate(`/bracket/${bracketId}`);
  };

  const assignParticipants = async (data) => {
    try {
      const res = await axios.put(`${URL2}/${match.matchId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("Participants assigned successfully");
        onSave();
        // onSave2();
        closePopup();
      }
    } catch (error) {
      // message.error(error.response?.data);
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
          Round Group
        </div>
        <p>Round: {match.roundOrder}</p>
        <p>Match Order: {match.matchOrder}</p>
        <p>First Team: {match.firstTeam || "?"}</p>
        <p>Second Team: {match.secondTeam || "?"}</p>

        <div className="flex flex-col w-full items-center mt-6">
          <div className="form-group mb-2 flex flex-col text-left">
            <label className="mb-1" htmlFor="firstTeamId">
              First Team Participant <span className="text-red-500">*</span>
            </label>
            <Select
              showSearch
              placeholder="First Team"
              optionFilterProp="label"
              options={options}
              onChange={(value) => handleInputChange(value, "firstTeamId")}
              className="w-[180px]"
            />
            {errors.firstTeam_err && (
              <span className="error">{errors.firstTeam_err}</span>
            )}
          </div>
          <div className="form-group mb-2 flex flex-col text-left">
            <label className="mb-1" htmlFor="secondTeamId">
              Second Team Participant <span className="text-red-500">*</span>
            </label>
            <Select
              showSearch
              placeholder="Second Team"
              optionFilterProp="label"
              options={options}
              onChange={(value) => handleInputChange(value, "secondTeamId")}
              className="w-[180px]"
            />
            {errors.secondTeam_err && (
              <span className="error">{errors.secondTeam_err}</span>
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

export default AddParticipantGroup;
