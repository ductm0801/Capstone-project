import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/formAddUser.css";
import { Select } from "antd";

const initialState = {
  username: "",
  password: "",
  fullName: "",
  phoneNumber: "",
  email: "",
  rank: "",
  status: "",
};

const error_init = {
  username_err: "",
  password_err: "",
  fullName_err: "",
  phoneNumber_err: "",
  email_err: "",
};

const FormEditUser = ({ show, handleClose, onSave, user }) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(error_init);

  useEffect(() => {
    if (user) {
      setState({
        ...state,
        username: user.username || "",
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        rank: user.rank || "",
        status: user.status || "active",
      });
    }
  }, [user]);

  const URL = "http://localhost:5000/api/users";
  const options = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }));
  const showHideClassName = show ? "popup display-block" : "popup display-none";

  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    if (!state.fullName || state.fullName.trim() === "") {
      errors.fullName_err = "Full name is required";
      isValid = false;
    }

    if (
      !state.email ||
      state.email.trim() === "" ||
      !/\S+@\S+\.\S+/.test(state.email)
    ) {
      errors.email_err = "A valid email is required";
      isValid = false;
    }
    if (
      !state.phoneNumber ||
      state.phoneNumber.trim() === "" ||
      !/(84|0[3|5|7|8|9])+([0-9]{8})/.test(state.phoneNumber)
    ) {
      errors.phoneNumber_err =
        "Phone number is required and must be a valid 10-digit number";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      updateUser(state);
    }
  };

  const updateUser = async (data) => {
    try {
      const res = await axios.put(`${URL}/${user.id}`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("User has been updated successfully");
        onSave();
        handleClose();
      }
    } catch (error) {
      toast.error("An error occurred while updating the user");
    }
  };

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSelectChange = (value, field) => {
    setState((state) => ({ ...state, [field]: value }));
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <h1 className="text-3xl mb-4 text-[#033987] font-bold">Update User</h1>
        <button className="close-button text-3xl " onClick={handleClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="username">
              Username <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              disabled
              type="text"
              name="username"
              placeholder="Username"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={state.username}
              onChange={handleInputChange}
            />
            {errors.username_err && (
              <span className="error">{errors.username_err}</span>
            )}
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="fullName">
              Full Name <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={state.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName_err && (
              <span className="error">{errors.fullName_err}</span>
            )}
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="phoneNumber">
              Phone Number <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={state.phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phoneNumber_err && (
              <span className="error">{errors.phoneNumber_err}</span>
            )}
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="email">
              Email <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={state.email}
              onChange={handleInputChange}
            />
            {errors.email_err && (
              <span className="error">{errors.email_err}</span>
            )}
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="rank">
              Rank <span className="text-red-500 font-bold">*</span>
            </label>
            <Select
              showSearch
              value={state.rank}
              options={options}
              onChange={(value) => handleSelectChange(value, "rank")}
            />
          </div>
          <div className="flex flex-col text-left mb-4 gap-2">
            <label htmlFor="status">
              Status <span className="text-red-500 font-bold">*</span>
            </label>
            <Select
              showSearch
              value={state.status}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              onChange={(value) => handleSelectChange(value, "status")}
            />
          </div>
          <button type="submit" className="form-button">
            Update
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormEditUser;
