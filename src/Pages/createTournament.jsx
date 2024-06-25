import React, { useState } from "react";
import "../styles/createtournament.css";
import defaultImg from "../images/defaultImg.png";
import { FaEdit } from "react-icons/fa";
const CreateTournament = () => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    location: "",
    endDate: "",
    description: "",
  });
  const [imageSrc, setImageSrc] = useState(defaultImg);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
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
    <div className="wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="header">
          <h1>Create Tournament</h1>
          <p>Please fulfill properly data for all required fields!</p>
        </div>
        <div className="form-content border-t-2 border-inherit justify-center pt-4">
          <div className="image-container">
            <p className="mb-4">Tournament Logo</p>
            <img src={imageSrc} alt="Upload" />
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageChange}
            />
            <label htmlFor="fileInput">
              <FaEdit className="text-black absolute top-[450px] left-[800px]" />
            </label>
          </div>

          <div className="flex gap-8">
            <div>
              <div className="form-group flex flex-col">
                <label htmlFor="name">
                  Name <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-2 border-inherit rounded-lg p-2 mb-4"
                />
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="location">
                  Location <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="border-2 border-inherit rounded-lg p-2"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <div className="form-group flex flex-col">
                  <label htmlFor="endDatestartDate ">
                    Start Date <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate "
                    placeholder="dd/mm/yyyy"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="border-2 border-inherit rounded-lg p-2 mb-4"
                  />
                </div>
                <div className="form-group flex flex-col">
                  <label htmlFor="endDate">
                    End Date <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    placeholder="dd/mm/yyyy"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="border-2 border-inherit rounded-lg p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description..."
            value={formData.description}
            onChange={handleChange}
            className="border-2 border-inherit rounded-lg p-2"
          />
        </div>
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTournament;
