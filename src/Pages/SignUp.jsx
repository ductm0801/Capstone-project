import React, { useState } from "react";
import logo from "../images/menu_logo.png";
import "../styles/signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import popImg from "../images/signup.png";
import { Select } from "antd";

const SignUp = ({ closePopup, show, onSave }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000/api/User/Register";
  const signUpApi = (
    fullName,
    rank,
    email,
    dateOfBirth,
    gender,
    phoneNumber
  ) => {
    return axios.post(baseURL, {
      fullName: fullName,
      rank: rank,
      phoneNumberNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      email: email,
      gender: gender,
    });
  };
  const validate = () => {
    const errors = {};
    if (!fullName) errors.fullName = "Full Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!gender) errors.gender = "Gender is required";
    if (!rank) errors.rank = "Rank is required";
    if (!phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})/.test(phoneNumber)) {
      errors.phoneNumber = "Phone Number is invalid";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        let res = await signUpApi(fullName, rank, email, dateOfBirth, gender);
        if (res) {
          toast.success("Form submitted successfully");
          setfullName("");
          setRank("");
          setDateOfBirth("");
          setPhoneNumber("");
          setGender("");
          setErrors({});
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  const handleChangeRank = (value) => {
    setRank(value);
  };
  const handleChangeGender = (value) => {
    setRank(value);
  };

  return (
    <div className={showHideClassName}>
      <section
        className="popup-main max-w-[600px] w-full"
        style={{
          background: `url(${popImg})`,
        }}
      >
        <div>
          <img className="block m-auto" src={logo} alt=""></img>

          <div>
            <h2 className="text-3xl text-white font-bold m-8">
              Tournament Register{" "}
            </h2>
            <button
              className="text-white top-2 right-3 absolute text-3xl "
              onClick={closePopup}
            >
              &times;
            </button>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
              <h4 className="text-white text-left text-lg my-3 mx-8 ">
                Full Name
              </h4>
              <input
                className="rounded-lg p-2 mx-8"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
              <h4 className="text-white text-left text-lg my-3 mx-8 ">
                Phone Number
              </h4>
              <input
                className="rounded-lg p-2 mx-8"
                type="phone"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}

              <h4 className="text-white text-left text-lg my-3 mx-8 ">Email</h4>
              <input
                className="rounded-lg p-2 mx-8"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <h4 className="text-white text-left text-lg my-3 mx-8 ">
                Date of Birth
              </h4>
              <input
                className="rounded-lg p-2 mx-8"
                type="date"
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              {errors.dateOfBirth && (
                <p className="error">{errors.dateOfBirth}</p>
              )}
              <h4 className="text-white text-left text-lg my-3 mx-8 ">Rank</h4>
              <Select
                className="rounded-lg mx-8 h-[40px]"
                placeholder="Select Rank "
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
              {errors.rank && <p className="error">{errors.rank}</p>}
              <h4 className="text-white text-left text-lg my-3 mx-8 ">
                Gender
              </h4>
              <Select
                className="rounded-lg mx-8 h-[40px]"
                placeholder="Select a gender"
                onChange={handleChangeGender}
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
              />

              {errors.gender && <p className="error">{errors.gender}</p>}
              <button
                className="text-white py-2 px-4 bg-[#C6C61A] rounded-lg mt-6 mx-[80px]"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SignUp;
