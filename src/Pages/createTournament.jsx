import React, { useEffect, useState } from "react";
import "../styles/createtournament.css";
import defaultImg from "../images/defaultImg.png";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker, message, Select, Upload } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";

const CreateTournament = () => {
  const URL = "https://nhub.site/api/tournament-campaign";
  const courtURL = "https://nhub.site/api/courtGroups";
  const uploadURL = "https://nhub.site/api/image/upload";
  const navigate = useNavigate();

  const [courts, setCourts] = useState([]);
  const [formData, setFormData] = useState({
    tournamentName: "",
    startDate: "",
    courtGroups: "",
    endDate: "",
    description: "",
  });
  const [imageSrc, setImageSrc] = useState("string");

  dayjs.extend(customParseFormat);

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(courtURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourts(res.data);
    } catch (e) {
      handleError(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleError = (error) => {
    if (error.response && error.response.data) {
      message.error(error.response.data.title || "An error occurred");
    } else {
      message.error("An error occurred");
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(uploadURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        setImageSrc(res.data.url);
        return res.data.url;
      }
    } catch (error) {
      handleError(error);
    }
    return null;
  };

  const courtOptions = courts.map((court) => ({
    label: court.courtGroupName,
    value: court.id,
  }));

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      courtGroups: value,
    });
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

    const token = localStorage.getItem("token");

    try {
      const courtGroupsPayload = formData.courtGroups.map((courtGroupId) => ({
        courtGroupId,
      }));

      const payload = {
        tournamentName: formData.tournamentName,
        startDate: moment(formData.startDate).format("DD-MM-YYYY"),
        endDate: moment(formData.endDate).format("DD-MM-YYYY"),
        description: formData.description,
        imageUrl: imageSrc,
        courtGroups: courtGroupsPayload,
        registrationExpiredDate: moment(
          formData.registrationExpiredDate
        ).format("DD-MM-YYYY"),
      };

      const res = await axios.post(URL, payload, {
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
      handleError(error);
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

            <Upload
              accept="image/*"
              id="imageUrl"
              customRequest={({ file, onSuccess }) => {
                uploadImage(file).then((url) => {
                  onSuccess(url);
                });
              }}
              listType="picture-card"
            >
              Upload
            </Upload>
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
                <label htmlFor="courtGroups">
                  Location <span className="text-red-500 font-bold">*</span>
                </label>
                <Select
                  mode="multiple"
                  id="courtGroups"
                  name="location"
                  size="large"
                  options={courtOptions}
                  placeholder="Location"
                  value={formData.courtGroups}
                  onChange={handleSelectChange}
                  required
                  className="border border-inherit rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
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
              <div className="form-group flex flex-col">
                <label htmlFor="registrationExpiredDate">
                  Resgistration Expired Date{" "}
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <DatePicker
                  format="YYYY-MM-DD"
                  id="registrationExpiredDate"
                  name="registrationExpiredDate"
                  disabledDate={disabledDate}
                  placeholder="dd/mm/yyyy"
                  value={
                    formData.registrationExpiredDate
                      ? dayjs(formData.registrationExpiredDate)
                      : null
                  }
                  onChange={(date, dateString) =>
                    handleDateChange(
                      date,
                      dateString,
                      "registrationExpiredDate"
                    )
                  }
                  required
                  className="border-2 border-inherit rounded-lg p-2 focus:outline-none"
                />
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
