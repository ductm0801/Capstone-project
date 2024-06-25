import React, { useState } from "react";
import "../styles/createTournamentFormat.css";
import defaultImg from "../images/defaultImg.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const CreateTournamentFormat = ({ handleClose, show }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const [imageSrc, setImageSrc] = useState(defaultImg);
  const [value, setValue] = useState("8");
  const [rank, setRank] = useState("1");
  const [selectedType, setSelectedType] = useState("Men's Single");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const URL =
    "http:localhost:5000/api/TournamentWithFormatType/CreateTouranmentWithFormatType";

  const addNewTournamentFormat = async (data) => {
    try {
      const res = await axios.post(URL, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("New tournament format has been added successfully ~");
        navigate(`/tournamentDetail/${id}`);
      }
    } catch (error) {
      toast.error("Failed to add new tournament format");
    }
  };
  const competitorTypes = [
    "Men's Single",
    "Women's Single",
    "Dual Mix",
    "Men Dual",
    "Women Dual",
  ];

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  const handleChangeRank = (e) => {
    setRank(e.target.value);
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

    const data = {
      tournamentName: name,
      formatType: selectedType,
      numberOfTeams: value,
      rank: rank,
      tournamentId: id,
    };
    console.log(data);
    addNewTournamentFormat(data);
  };
  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <h1 className="text-left text-3xl font-bold px-3">
          {" "}
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
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4"
              type="text"
              placeholder="Name"
              value={name}
              required
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
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
              <div className="flex gap-16 ">
                <div>
                  <p className="cursor-default">
                    Number of Competitors{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </p>

                  <select
                    className="border-2 border-inherit width-[248px] rounded-lg"
                    value={value}
                    onChange={handleChangeValue}
                  >
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                    <option value="128">128</option>
                  </select>
                </div>
                <div>
                  <p>
                    {" "}
                    Rank <span className="text-red-500 font-bold">*</span>
                  </p>
                  <select
                    className="border-2 border-inherit width-[248px] rounded-lg"
                    value={rank}
                    onChange={handleChangeRank}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
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
