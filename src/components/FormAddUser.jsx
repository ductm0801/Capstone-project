import { useState } from "react";
import "../styles/formAddUser.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
const initialState = {
  username: "",
  password: "",
  fullName: "",
};
const error_init = {
  username_err: "",
  password_err: "",
  fullName_err: "",
};
const FormAddUser = ({ handleClose, show }) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(error_init);
  const { username, password, fullName } = state;
  const { id } = useParams();
  const URL = "http://localhost:5000/api/accounts/CreateAccount";

  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    if (username.trim() === "" || username.length < 2) {
      errors.username_err = "Username is Required";
      if (username.length < 2) {
        errors.username_err = "Username must be more than 2 words";
      }
      isValid = false;
    }

    if (password.trim() === "" || password.length < 8) {
      errors.password = "password is required";
      if (password.length < 2) {
        errors.password_err = "password must be more than 8 words";
      }
      isValid = false;
    }

    if (fullName.trim() === "") {
      errors.fullName_err = "full Name is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      addNewUser(state);
    } else {
      toast.error("Some info is invalid ~ Pls check again");
    }
  };
  const addNewUser = async (data) => {
    const res = await axios.post(`${URL}`, data);
    if (res.status === 200 || res.status === 201) {
      toast.success("New User has been added successfully");
      handleClose();
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
              UserName <span className="text-red-500 font-bold">*</span>
            </label>
            <input
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
            <label htmlFor="password">
              Password <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4 focus:outline-none"
              value={state.password}
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
              value={state.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName_err && (
              <span className="error">{errors.fullName_err}</span>
            )}
          </div>
          <button type="submit" className="form-button">
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </section>
    </div>
  );
};
export default FormAddUser;
