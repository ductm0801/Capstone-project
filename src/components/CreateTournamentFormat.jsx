import React, { useState } from "react";
import "../styles/createTournamentFormat.css";
import defaultImg from "../images/defaultImg.png";
import { Select } from "@mui/material";

const CreateTournamentFormat = ({ handleClose, show }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const [imageSrc, setImageSrc] = useState(defaultImg);
  const [value, setValue] = useState("8");
  const [selectedType, setSelectedType] = useState("Men's Single");

  const competitorTypes = [
    "Men's Single",
    "Women's Single",
    "Dual Mix",
    "Man Dual",
    "Women Dual",
  ];

  const handleChangeValue = (e) => {
    setValue(e.target.value);
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
          <div>
            <img src={imageSrc} alt="Upload" className="image" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
          </div>
          <div>
            <p className="text-left py-[16px]">Competitor type</p>
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
            <div className="flex flex-col items-start gap-8 pt-[16px]">
              <p className="cursor-default">Number of Competitors</p>
              <select
                className="border-2 border-inherit width-[248px] rounded-lg"
                value={value}
                onChange={handleChangeValue}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
              </select>

              <button className="bg-[#C6C61A] py-2.5 px-[72px] rounded-lg text-white">
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
