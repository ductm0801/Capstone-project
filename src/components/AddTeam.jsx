import { useEffect, useState } from "react";
import { message, Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/formAddUser.css";
import popImg from "../images/addparticipant.png";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstTeam: {
    firstAthleteId: 0,
    secondAthleteId: 0,
  },
  secondTeam: {
    firstAthleteId: 0,
    secondAthleteId: 0,
  },
};

const errorInit = {
  firstTeam1Input_err: "",
  secondTeam1Input_err: "",
  firstTeam2Input_err: "",
  secondTeam2Input_err: "",
};

const AddTeam = ({ match, closePopup, tournamentId, bracketId, onSave }) => {
  const [participants, setParticipants] = useState([]);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(errorInit);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const URL =
    "https://pickleball-agdwcrbacmaea5fg.eastus-01.azurewebsites.net/api/athletes/non-teams";
  const URL2 =
    "https://pickleball-agdwcrbacmaea5fg.eastus-01.azurewebsites.net/api/pickleball-match/assign-double-team";

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
    // navigate(`/bracket/${bracketId}`);
  }, []);

  const options = participants.map((participant) => ({
    label: `${participant.athleteName} (${participant.athleteType})`,
    value: participant.id,
  }));

  const assignTeam = async (data) => {
    try {
      const res = await axios.put(`${URL2}/${match.matchId}`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("Teams assigned successfully");
        onSave();
        closePopup();
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    assignTeam(state);
  };

  const handleInputChange = (team, key, value) => {
    setState((prevState) => ({
      ...prevState,
      [team]: {
        ...prevState[team],
        [key]: value,
      },
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
                <label className="mb-1" htmlFor="firstTeam1Input">
                  First Participant of Team 1{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  showSearch
                  placeholder="First Participant of Team 1"
                  optionFilterProp="label"
                  options={options}
                  onChange={(value) =>
                    handleInputChange("firstTeam", "firstAthleteId", value)
                  }
                />
              </div>
              <div className="form-group mb-4 flex flex-col text-left">
                <label className="mb-1" htmlFor="secondTeam1Input">
                  Second Participant of Team 1{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  showSearch
                  placeholder="Second Participant of Team 1"
                  optionFilterProp="label"
                  options={options}
                  onChange={(value) =>
                    handleInputChange("firstTeam", "secondAthleteId", value)
                  }
                />
              </div>
            </div>
            <div>
              <div className="form-group mb-4 flex flex-col text-left">
                <label className="mb-1" htmlFor="firstTeam2Input">
                  First Participant of Team 2{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  showSearch
                  placeholder="First Participant of Team 2"
                  optionFilterProp="label"
                  options={options}
                  onChange={(value) =>
                    handleInputChange("secondTeam", "firstAthleteId", value)
                  }
                />
              </div>
              <div className="form-group mb-4 flex flex-col text-left">
                <label className="mb-1" htmlFor="secondTeam2Input">
                  Second Participant of Team 2{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  showSearch
                  placeholder="Second Participant of Team 2"
                  optionFilterProp="label"
                  options={options}
                  onChange={(value) =>
                    handleInputChange("secondTeam", "secondAthleteId", value)
                  }
                />
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
