import { CiSearch } from "react-icons/ci";
import "../styles/manager.css";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import FormAddUser from "./FormAddUser";
import axios from "axios";
import FormEditUser from "./FormEditUser";

const ManageUser = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [user, setUser] = useState({});

  const URL = "https://apis-pickleball.somee.com/api/users";

  const getUsers = async () => {
    try {
      const res = await axios.get(URL);
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const handleAddButtonClick = () => {
    setShowPopup(true);
  };

  const handleUpdateButtonClick = (user) => {
    setShowUpdate(true);
    setUser(user);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

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
          onSave={getUsers}
        ></FormAddUser>

        <FormEditUser
          show={showUpdate}
          handleClose={handleCloseUpdate}
          onSave={getUsers}
          user={user}
        ></FormEditUser>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center search-container">
          <input
            type="text"
            placeholder="Searching"
            className="border rounded-lg mb-[32px] h-[60px] w-[633px] search-input"
          />
          <CiSearch className="search-icon" />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <table className="table-auto w-full text-left cursor-pointer">
          <thead className="text-white bg-[#155ABE] pl-[20px] h-[56px]">
            <tr>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Full Name
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Email
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Phone
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Rank
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Gender
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} onClick={() => handleUpdateButtonClick(user)}>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.fullName}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.email}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.phoneNumber}
                </td>
                <td className="border border-slate-300 text-center pl-[20px] h-[48px]">
                  {user.rank}
                </td>

                <td className="border border-slate-300 text-center pl-[20px] h-[48px]">
                  {user.gender}
                </td>

                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  <div
                    className={`status-item ${
                      user.status === 0 ? "status-active" : "status-inactive"
                    }`}
                  >
                    <span
                      className={`status-dot ${
                        user.status === 0 ? "dot-active" : "dot-inactive"
                      }`}
                    ></span>
                    <span className="mr-[5px]">
                      {user.status === 0 ? "Active" : "Deactivate"}
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
