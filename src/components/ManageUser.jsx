import { CiSearch } from "react-icons/ci";
import "../styles/manager.css";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import FormAddUser from "./FormAddUser";

const ManageUser = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUsers] = useState([
    {
      username: "TMD0801",
      email: "TMD@gmail.com",
      phone: "0123456789",
      role: "Member",
      isActive: true,
    },
    {
      username: "TMD0802",
      email: "TMD2@gmail.com",
      phone: "0987654321",
      role: "Member",
      isActive: false,
    },
  ]);

  const handleAddButtonClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      const firstInput = document.querySelector(".popup-container input");
      if (firstInput) firstInput.focus();
    }
  }, [showPopup]);

  const toggleStatus = (index) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <div className="flex flex-col px-[32px]">
      <div className="relative">
        <h1 className="text-2xl text-[#033987] font-bold border-b border-[#C6C61A] mb-[32px] py-6">
          Manage User
        </h1>
        <div className="absolute top-5 right-0 border border-[#C6C61A] rounded-lg p-2 bg-[#C6C61A] text-white">
          <button
            className="flex items-center gap-2"
            onClick={handleAddButtonClick}
          >
            <FaPlus />
            Add User
          </button>
        </div>
        <FormAddUser
          show={showPopup}
          handleClose={handleClosePopup}
        ></FormAddUser>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center search-container">
          <input
            type="text"
            placeholder="Searching"
            className={`border rounded-lg mb-[32px] h-[60px] w-[633px] search-input ${
              showPopup ? "disabled" : ""
            }`}
            disabled={showPopup}
          ></input>
          <CiSearch className={`search-icon ${showPopup ? "disabled" : ""}`} />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <table className="table-auto w-full text-left">
          <thead className="text-white bg-[#155ABE] pl-[20px] h-[56px]">
            <tr>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Username
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Email
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Phone
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Role
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.username}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.email}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.phone}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.role}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  <div
                    className={`status-item ${
                      user.isActive ? "status-active" : "status-inactive"
                    }`}
                    onClick={() => toggleStatus(index)}
                  >
                    <span
                      className={`status-dot ${
                        user.isActive ? "dot-active" : "dot-inactive"
                      }`}
                    ></span>
                    <span className="mr-[5px]">
                      {user.isActive ? "Active" : "Deactivate"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
