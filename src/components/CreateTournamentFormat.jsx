import React, { useEffect, useState } from "react";
import "../styles/createTournamentFormat.css";
import defaultImg from "../images/defaultImg.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { message, Select } from "antd";

const CreateTournamentFormat = ({ handleClose, show, onSave }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const [imageSrc, setImageSrc] = useState(defaultImg);
  const [value, setValue] = useState("8");
  const [rank, setRank] = useState("1");
  const [selectedType, setSelectedType] = useState("Men's Single");
  const [name, setName] = useState("");
  const [startDate, setstartDate] = useState("");
  const [campaignStartDate, setcampaignStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const URL = "https://webapi20240806093436.azurewebsites.net/api/tournament";
  const URL2 =
    "https://webapi20240806093436.azurewebsites.net/api/tournament-campaign";
  const token = localStorage.getItem("token");

  const getTournamentCampaign = async () => {
    try {
      const res = await axios.get(`${URL2}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setName(res.data.name);
        setcampaignStartDate(res.data.startDate);
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };
  console.log(campaignStartDate);
  useEffect(() => {
    getTournamentCampaign();
  }, []);

  const addNewTournamentFormat = async (data) => {
    try {
      const res = await axios.post(URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("New tournament format has been added successfully ~");
        onSave();
        handleClose();
        navigate(`/tournamentDetail/${id}`);
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };
  const competitorTypes = [
    "Men's Single",
    "Women's Single",
    "Dual Mix",
    "Men Dual",
    "Women Dual",
  ];

  const handleChangeValue = (value) => {
    setValue(value);
  };
  const handleChangeRank = (value) => {
    setRank(value);
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const campaignStart = new Date(campaignStartDate);

    if (start < campaignStart) {
      message.error("Tournament start date must be within the campaign dates.");
      return;
    }

    const data = {
      tournamentName: name,
      formatType: selectedType,
      startDate: startDate,
      endDate: endDate,
      numberOfTeams: value,
      rank: rank,
      tournamentCampaignId: id,
      tournamentType: "Elimination",
    };
    console.log(data);
    addNewTournamentFormat(data);
  };
  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <h1 className="text-left text-3xl font-bold px-3">
          Create tournament format
        </h1>
        <p className="text-left px-3 py-4">
          Please fullfill property data for all required field!
        </p>
        <button className="close-button text-3xl " onClick={handleClose}>
          &times;
        </button>
        <div className="border-t-2 border-inherit flex">
          <div className="image-container">
            <img src={imageSrc} alt="Upload" className="image" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="image-input"
            />
            <label htmlFor="image-input">
              <FaEdit className="text-black absolute top-[120px] left-[140px]" />
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-left mb-4">
              Name <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none mb-4"
              type="text"
              placeholder="Name"
              value={name}
              required
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <div className="w-[320px] flex flex-col">
              <div className="text-left mb-4">
                Start Date <span className="text-red-500 font-bold">*</span>
              </div>
              <input
                type="date"
                id="startDate"
                name="startDate"
                placeholder="dd/mm/yyyy"
                value={startDate}
                onChange={(e) => setstartDate(e.target.value)}
                required
                className="border-2 border-inherit rounded-lg p-2 mb-4 focus:outline-none"
              />
            </div>
            <div className="w-[320px] flex flex-col">
              <div className="text-left mb-4">
                End Date <span className="text-red-500 font-bold">*</span>
              </div>
              <input
                type="date"
                id="endDate"
                name="endDate"
                placeholder="dd/mm/yyyy"
                value={endDate}
                onChange={(e) => setendDate(e.target.value)}
                required
                className="border-2 border-inherit rounded-lg p-2 mb-4 focus:outline-none"
              />
            </div>
            <p className="text-left py-[16px]">
              Competitor type <span className="text-red-500 font-bold">*</span>
            </p>
            <div className="flex">
              {competitorTypes.map((type) => (
                <div
                  key={type}
                  className={`option  ${
                    selectedType === type ? "selected" : ""
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start justify-start gap-8 pt-[16px]">
              <div className="flex gap-16">
                <div>
                  <p className="cursor-default text-left">
                    Number of Team{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </p>
                  <Select
                    className="border-2 border-inherit width-[248px] w-[200px] text-left rounded-lg"
                    onChange={handleChangeValue}
                    options={[
                      { label: "8 Team", value: "8" },
                      { label: "16 Team", value: "16" },
                      { label: "32 Team", value: "32" },
                      { label: "64 Team", value: "64" },
                    ]}
                  />
                </div>
                <div>
                  <p className="text-left">
                    {" "}
                    Rank <span className="text-red-500 font-bold">*</span>
                  </p>
                  <Select
                    className="border-2 border-inherit w-[150px] text-left rounded-lg"
                    onChange={handleChangeRank}
                    options={[
                      { label: "Rank 1", value: "1" },
                      { label: "Rank 2", value: "2" },
                      { label: "Rank 3", value: "3" },
                      { label: "Rank 4", value: "4" },
                      { label: "Rank 5", value: "5" },
                      { label: "Rank 6", value: "6" },
                      { label: "Rank 7", value: "7" },
                      { label: "Rank 8", value: "8" },
                      { label: "Rank 9", value: "9" },
                      { label: "Rank 10", value: "10" },
                    ]}
                  />
                </div>
              </div>
              <button
                className="bg-[#C6C61A] py-2.5 px-[72px] rounded-lg text-white"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateTournamentFormat;
