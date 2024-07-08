import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import "../styles/formAddUser.css";
import popImg from "../images/addparticipant.png";

const initialState = {
  team1Name: "",
  firstTeam1Input: "",
  secondTeam1Input: "",
  team2Name: "",
  firstTeam2Input: "",
  secondTeam2Input: "",
};

const errorInit = {
  team1Name_err: "",
  firstTeam1Input_err: "",
  secondTeam1Input_err: "",
  team2Name_err: "",
  firstTeam2Input_err: "",
  secondTeam2Input_err: "",
};

const AddTeam = ({ match, closePopup }) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(errorInit);
  const {
    team1Name,
    firstTeam1Input,
    secondTeam1Input,
    team2Name,
    firstTeam2Input,
    secondTeam2Input,
  } = state;

  const validateForm = () => {
    let isValid = true;
    let errors = { ...errorInit };

    if (team1Name.trim() === "") {
      errors.team1Name_err = "Team 1 Name is required";
      isValid = false;
    }

    if (firstTeam1Input.trim() === "") {
      errors.firstTeam1Input_err = "First Participant of Team 1 is required";
      isValid = false;
    }

    if (secondTeam1Input.trim() === "") {
      errors.secondTeam1Input_err = "Second Participant of Team 1 is required";
      isValid = false;
    }

    if (team2Name.trim() === "") {
      errors.team2Name_err = "Team 2 Name is required";
      isValid = false;
    }

    if (firstTeam2Input.trim() === "") {
      errors.firstTeam2Input_err = "First Participant of Team 2 is required";
      isValid = false;
    }

    if (secondTeam2Input.trim() === "") {
      errors.secondTeam2Input_err = "Second Participant of Team 2 is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const res = await axios.post("http://localhost:5000/api/addTeam", {
          team1Name,
          firstTeam1Input,
          secondTeam1Input,
          team2Name,
          firstTeam2Input,
          secondTeam2Input,
        });
        if (res.status === 200 || res.status === 201) {
          toast.success("Team added successfully");
          closePopup();
        }
      } catch (error) {
        toast.error("Failed to add team");
        console.error("Error adding team:", error);
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
          Team
        </div>
        <p>Round: {match.roundOrder}</p>
        <p>Match Order: {match.matchOrder}</p>
        <p>First Team: {match.firstTeam || "?"}</p>
        <p>Second Team: {match.secondTeam || "?"}</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-4 mt-6 mb-6">
            <div>
              <div className="form-group mb-4 flex flex-col text-left">
                <label className="mb-1" htmlFor="team1Name">
                  Team 1 Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="team1Name"
                  value={team1Name}
                  onChange={handleInputChange}
                  className=" px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
                {errors.team1Name_err && (
                  <span className="error">{errors.team1Name_err}</span>
                )}
              </div>
              <div className="form-group mb-4 flex flex-col text-left">
                <label className="mb-1" htmlFor="firstTeam1Input">
                  First Participant of Team 1{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstTeam1Input"
                  value={firstTeam1Input}
                  onChange={handleInputChange}
                  className=" px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
                {errors.firstTeam1Input_err && (
                  <span className="error">{errors.firstTeam1Input_err}</span>
                )}
              </div>
              <div className="form-group mb-4 flex flex-col text-left">
                <label className="mb-1" htmlFor="secondTeam1Input">
                  Second Participant of Team 1{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="secondTeam1Input"
                  value={secondTeam1Input}
                  onChange={handleInputChange}
                  className=" px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
                {errors.secondTeam1Input_err && (
                  <span className="error">{errors.secondTeam1Input_err}</span>
                )}
              </div>
            </div>
            <div>
              <div className="form-group mb-4 flex flex-col text-left">
                <label className="mb-1" htmlFor="team2Name">
                  Team 2 Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="team2Name"
                  value={team2Name}
                  onChange={handleInputChange}
                  className=" px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
                {errors.team2Name_err && (
                  <span className="error">{errors.team2Name_err}</span>
                )}
              </div>
              <div className="form-group mb-4 flex flex-col text-left">
                <label className="mb-1" htmlFor="firstTeam2Input">
                  First Participant of Team 2{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstTeam2Input"
                  value={firstTeam2Input}
                  onChange={handleInputChange}
                  className=" px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
                {errors.firstTeam2Input_err && (
                  <span className="error">{errors.firstTeam2Input_err}</span>
                )}
              </div>
              <div className="form-group mb-4 flex flex-col text-left">
                <label className="mb-1" htmlFor="secondTeam2Input">
                  Second Participant of Team 2{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="secondTeam2Input"
                  value={secondTeam2Input}
                  onChange={handleInputChange}
                  className=" px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
                {errors.secondTeam2Input_err && (
                  <span className="error">{errors.secondTeam2Input_err}</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-4 justify-center items-center mb-6">
              <button
                type="button"
                className="text-l mb-[32px] mt-[16px] px-14 py-2 border-2 border-blue-500 rounded-lg text-blue-500 font-bold"
                onClick={closePopup}
              >
                Back
              </button>
              <button
                type="button"
                className="text-l mb-[32px] mt-[16px] px-14 py-2 border-2 border-[#C6C61A] bg-[#C6C61A] rounded-lg text-white"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
