import React, { useState } from "react";
import "../styles/AddParticipant.css";
import popImg from "../images/addparticipant.png";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  firstTeamInput: "",
  secondTeamInput: "",
};

const errorInit = {
  firstTeamInput_err: "",
  secondTeamInput_err: "",
};

const AddParticipant = ({ match, closePopup }) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(errorInit);
  const { firstTeamInput, secondTeamInput } = state;

  const validateForm = () => {
    let isValid = true;
    let errors = { ...errorInit };

    if (firstTeamInput.trim() === "") {
      errors.firstTeamInput_err = "First Team Participant is required";
      isValid = false;
    }

    if (secondTeamInput.trim() === "") {
      errors.secondTeamInput_err = "Second Team Participant is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/addParticipant",
          {
            firstTeamInput,
            secondTeamInput,
          }
        );
        if (res.status === 200 || res.status === 201) {
          toast.success("Participants added successfully");
          closePopup();
        }
      } catch (error) {
        toast.error("Failed to add participants");
        console.error("Error adding participants:", error);
      }
    } else {
      toast.error("Please fill out all required fields");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
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

        <div className="flex flex-col items-center mt-6">
          <div className="form-group mb-2  flex flex-col text-left">
            <label className="mb-1" htmlFor="firstTeamInput">
              First Team Participant <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstTeamInput"
              value={firstTeamInput}
              onChange={handleInputChange}
              className=" px-4 py-2 border-2 border-gray-300 rounded-lg"
            />
            {errors.firstTeamInput_err && (
              <span className="error">{errors.firstTeamInput_err}</span>
            )}
          </div>
          <div className="form-group mb-2  flex flex-col text-left">
            <label className="mb-1" htmlFor="secondTeamInput">
              Second Team Participant <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="secondTeamInput"
              value={secondTeamInput}
              onChange={handleInputChange}
              className=" px-4 py-2 border-2 border-gray-300 rounded-lg"
            />
            {errors.secondTeamInput_err && (
              <span className="error">{errors.secondTeamInput_err}</span>
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
