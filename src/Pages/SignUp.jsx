import React, { useState } from "react";
import logo from "../images/menu_logo.png";
import "../styles/signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000/api/User/Register";
  const signUpApi = (username, password, email, dateOfBirth, gender) => {
    return axios.post(baseURL, {
      userName: username,
      password: password,
      dateOfBirth: dateOfBirth,
      email: email,
      gender: gender,
    });
  };
  const validate = () => {
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!gender) errors.gender = "Gender is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Proceed with form submission
      try {
        let res = await signUpApi(
          username,
          password,
          email,
          dateOfBirth,
          gender
        );
        if (res) {
          toast.success("Form submitted successfully");

          // Clear the form
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setDateOfBirth("");
          setEmail("");
          setGender("");
          setErrors({});
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="signup-bg">
      <img className="signup-logo" src={logo} alt=""></img>

      <div className="signup-content">
        <h2>Create Your Account</h2>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <h4>User Name</h4>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <h4>Password</h4>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          {errors.password && <p className="error">{errors.password}</p>}
          <h4>Confirm Password</h4>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <h4>Email</h4>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <h4>Date of Birth</h4>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
          <h4>Gender</h4>
          <select
            style={{ height: "40px" }}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
