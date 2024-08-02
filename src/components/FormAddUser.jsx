import { useState } from "react";
import "../styles/formAddUser.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { message } from "antd";

const initialState = {
  username: "",
  password: "",
  fullName: "",
  phoneNumber: "",
  email: "",
  Address: "",
};

const error_init = {
  username_err: "",
  password_err: "",
  fullName_err: "",
  phoneNumber_err: "",
  email_err: "",
};

const FormAddUser = ({ handleClose, show, onSave, loading }) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(error_init);
  const { username, password, fullName, phoneNumber, email, Address } = state;
  const { id } = useParams();
  const URL = "http://localhost:5000/api/users";

  const showHideClassName = show ? "popup display-block" : "popup display-none";

  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    if (!username || username.trim() === "" || username.length < 2) {
      errors.username_err =
        "Username is required and must be more than 2 characters";
      isValid = false;
    }

    if (!password || password.trim() === "" || password.length < 8) {
      errors.password_err =
        "Password is required and must be at least 8 characters";
      isValid = false;
    }

    if (!fullName || fullName.trim() === "") {
      errors.fullName_err = "Full name is required";
      isValid = false;
    }

    if (
      !phoneNumber ||
      phoneNumber.trim() === "" ||
      !/(84|0[3|5|7|8|9])+([0-9]{8})/.test(phoneNumber)
    ) {
      errors.phoneNumber_err =
        "Phone number is required and must be a valid 10-digit number";
      isValid = false;
    }

    if (!email || email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
      errors.email_err = "A valid email is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      addNewUser(state);
    }
  };

  const addNewUser = async (data) => {
    try {
      const res = await axios.post(`${URL}`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("New User has been added successfully");
        onSave();
        handleClose();
      }
    } catch (error) {
      message.error(error.message.data);
    }
  };

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setState((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <h1 className="text-3xl mb-4 text-[#033987] font-bold">Add New User</h1>
        <button className="close-button text-3xl " onClick={handleClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="username">
              Username <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={username}
              onChange={handleInputChange}
            />
            {errors.username_err && (
              <span className="error">{errors.username_err}</span>
            )}
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="password">
              Password <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={password}
              onChange={handleInputChange}
            />
            {errors.password_err && (
              <span className="error">{errors.password_err}</span>
            )}
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="fullName">
              Full Name <span className="text-red-500 font-bold">*</span>{" "}
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={fullName}
              onChange={handleInputChange}
            />
            {errors.fullName_err && (
              <span className="error">{errors.fullName_err}</span>
            )}
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="phoneNumber">
              Phone Number <span className="text-red-500 font-bold">*</span>{" "}
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phoneNumber_err && (
              <span className="error">{errors.phoneNumber_err}</span>
            )}
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="Address">
              Address <span className="text-red-500 font-bold">*</span>{" "}
            </label>
            <input
              type="text"
              name="Address"
              placeholder="Address"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={Address}
              onChange={handleInputChange}
            />
            {errors.phoneNumber_err && (
              <span className="error">{errors.phoneNumber_err}</span>
            )}
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="email">
              Email <span className="text-red-500 font-bold">*</span>{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={email}
              onChange={handleInputChange}
            />
            {errors.email_err && (
              <span className="error">{errors.email_err}</span>
            )}
          </div>
          <button type="submit" className="form-button">
            Create
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormAddUser;
