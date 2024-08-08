import React, { useState } from "react";
import "../styles/createtournament.css";
import defaultImg from "../images/defaultImg.png";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker, message } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const CreateTournament = () => {
  const URL = "http://localhost:5000/api/tournament-campaign";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tournamentName: "",
    startDate: "",
    location: "",
    endDate: "",
    description: "",
  });
  const [imageSrc, setImageSrc] = useState(defaultImg);

  dayjs.extend(customParseFormat);

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date, dateString, name) => {
    setFormData({
      ...formData,
      [name]: dateString,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.startDate) < new Date()) {
      toast.error("Start date cannot be in the past");
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date cannot be earlier than start date");
      return;
    }
    console.log(formData);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("New tournament has been added successfully");
        navigate(`/findTournament`);
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result.split(",")[1];
        setFormData({
          ...formData,
          image: base64String,
        });
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      console.log(formData);
    }
  };

  return (
    <div className="wrapper bg-gray-300">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="header">
          <h1>Create Tournament</h1>
          <p>Please fulfill properly data for all required fields!</p>
        </div>
        <div className="form-content border-t-2 border-inherit justify-center pt-4">
          <div className="image-container relative">
            <p className="mb-4">Tournament Logo</p>
            <img src={imageSrc} alt="Upload" />
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={handleImageChange}
            />
            <label htmlFor="image">
              <FaEdit className="text-black absolute top-7 right-2 cursor-pointer" />
            </label>
          </div>

          <div className="flex gap-8">
            <div>
              <div className="form-group flex flex-col">
                <label htmlFor="tournamentName">
                  Name <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="tournamentName"
                  name="tournamentName"
                  placeholder="Name"
                  value={formData.tournamentName}
                  onChange={handleChange}
                  required
                  className="border-2 border-inherit rounded-lg p-2 mb-4 focus:outline-none"
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
                  className="border-2 border-inherit rounded-lg p-2 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <div className="form-group flex flex-col">
                  <label htmlFor="startDate">
                    Start Date <span className="text-red-500 font-bold">*</span>
                  </label>
                  <DatePicker
                    format="YYYY-MM-DD"
                    id="startDate"
                    name="startDate"
                    disabledDate={disabledDate}
                    value={
                      formData.startDate ? dayjs(formData.startDate) : null
                    }
                    onChange={(date, dateString) =>
                      handleDateChange(date, dateString, "startDate")
                    }
                    required
                    className="border-2 border-inherit rounded-lg p-2 mb-4 focus:outline-none"
                  />
                </div>
                <div className="form-group flex flex-col">
                  <label htmlFor="endDate">
                    End Date <span className="text-red-500 font-bold">*</span>
                  </label>
                  <DatePicker
                    format="YYYY-MM-DD"
                    id="endDate"
                    name="endDate"
                    disabledDate={disabledDate}
                    placeholder="dd/mm/yyyy"
                    value={formData.endDate ? dayjs(formData.endDate) : null}
                    onChange={(date, dateString) =>
                      handleDateChange(date, dateString, "endDate")
                    }
                    required
                    className="border-2 border-inherit rounded-lg p-2 focus:outline-none"
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
