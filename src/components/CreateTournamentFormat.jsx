import React, { useEffect, useState } from "react";
import "../styles/createTournamentFormat.css";
import defaultImg from "../images/defaultImg.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { message, Select } from "antd";

const { Option } = Select;

const CreateTournamentFormat = ({ handleClose, show, onSave }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const [imageSrc, setImageSrc] = useState(defaultImg);
  const [value, setValue] = useState("8");
  const [rank, setRank] = useState("1");
  const [selectedType, setSelectedType] = useState("Men's Single");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState("");
  const [tournamentType, setTournamentType] = useState("Elimination");
  const navigate = useNavigate();
  const { id } = useParams();

  const URL =
    "https://pickleball-agdwcrbacmaea5fg.eastus-01.azurewebsites.net/api/tournament";
  const URL2 =
    "https://pickleball-agdwcrbacmaea5fg.eastus-01.azurewebsites.net/api/tournament-campaign";
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
        setCampaignStartDate(res.data.startDate);
      }
    } catch (error) {
      message.error("Error fetching campaign details.");
    }
  };

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
        toast.success("New tournament format has been added successfully!");
        onSave();
        handleClose();
        navigate(`/tournamentDetail/${id}`);
      }
    } catch (error) {
      message.error("Error adding tournament format.");
    }
  };

  const competitorTypes = [
    "Men's Single",
    "Women's Single",
    "Dual Mix",
    "Men Dual",
    "Women Dual",
  ];

  const handleChangeValue = (value) => setValue(value);
  const handleChangeRank = (value) => setRank(value);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setImageSrc(event.target.result);
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
      startDate,
      endDate,
      numberOfTeams: value,
      rank,
      tournamentCampaignId: id,
      tournamentType,
    };

    addNewTournamentFormat(data);
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <h1 className="text-left text-3xl font-bold px-3">
          Create Tournament Format
        </h1>
        <p className="text-left px-3 py-4">
          Please fulfill all required fields!
        </p>
        <button className="close-button text-3xl" onClick={handleClose}>
          &times;
        </button>
        <div className="border-t-2 border-inherit flex">
          <div className="image-container relative">
            <img src={imageSrc} alt="Upload" className="image" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="image-input"
              className="absolute top-0 left-0 opacity-0"
            />
            <label
              htmlFor="image-input"
              className="absolute top-7 left-2 cursor-pointer"
            >
              <FaEdit className="text-black" />
            </label>
          </div>
          <div className="flex flex-col px-3">
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
            />
            <div className="w-[320px] flex flex-col mb-4">
              <label htmlFor="startDate" className="text-left mb-2">
                Start Date <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="border-2 border-inherit rounded-lg p-2 mb-4 focus:outline-none"
              />
            </div>
            <div className="w-[320px] flex flex-col mb-4">
              <label htmlFor="endDate" className="text-left mb-2">
                End Date <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="border-2 border-inherit rounded-lg p-2 mb-4 focus:outline-none"
              />
            </div>
            <div className="w-[320px] flex flex-col mb-4">
              <label htmlFor="tournamentType" className="text-left mb-2">
                Tournament Type{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <Select
                size="large"
                id="tournamentType"
                name="tournamentType"
                value={tournamentType}
                onChange={setTournamentType}
                required
                className="border border-inherit rounded-lg mb-4"
              >
                <Option value="Group Stage">Group Stage</Option>
                <Option value="Elimination">Elimination</Option>
              </Select>
            </div>
            <p className="text-left py-4">
              Competitor Type <span className="text-red-500 font-bold">*</span>
            </p>
            <div className="flex mb-4">
              {competitorTypes.map((type) => (
                <div
                  key={type}
                  className={`option ${
                    selectedType === type ? "selected" : ""
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex gap-16 mb-4">
                <div>
                  <p className="text-left">
                    Number of Teams{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </p>
                  <Select
                    className="border border-inherit w-[200px] text-left rounded-lg"
                    onChange={handleChangeValue}
                    value={value}
                  >
                    <Option value="8">8 Teams</Option>
                    <Option value="16">16 Teams</Option>
                    <Option value="32">32 Teams</Option>
                    <Option value="64">64 Teams</Option>
                  </Select>
                </div>
                <div>
                  <p className="text-left">
                    Rank <span className="text-red-500 font-bold">*</span>
                  </p>
                  <Select
                    className="border border-inherit w-[150px] text-left rounded-lg"
                    onChange={handleChangeRank}
                    value={rank}
                  >
                    {[...Array(10)].map((_, i) => (
                      <Option key={i + 1} value={`${i + 1}`}>
                        Rank {i + 1}
                      </Option>
                    ))}
                  </Select>
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
