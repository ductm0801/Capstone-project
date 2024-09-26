import { CiSearch } from "react-icons/ci";
import "../styles/manager.css";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import FormAddUser from "./FormAddUser";
import axios from "axios";
import FormEditUser from "./FormEditUser";
import { Pagination } from "antd";

const ManageUser = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [user, setUser] = useState({});
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const URL = "https://nhub.site/api/users/paged";
  const importURL = "https://nhub.site/api/users/import-users";

  const getUsers = async () => {
    try {
      const res = await axios.get(URL, {
        params: {
          pageIndex: pageIndex - 1,
          pageSize,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        setUsers(res.data.items);
        setTotalItemsCount(res.data.totalItemsCount);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fileInputRef = useRef(null);

  const handleImportFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file); // Append the selected file to the form data

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(importURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
        },
      });

      if (response.status === 200) {
        setSuccess("Users imported successfully!");
        getUsers(); // Refresh user list after successful import
      } else {
        setError("Failed to import users. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to import users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
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
  }, [pageIndex, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setPageIndex(page);
    setPageSize(pageSize);
  };

  return (
    <div className="flex flex-col px-[32px]">
      <div>
        <div className="flex justify-between items-center border-b border-[#C6C61A] mb-[32px] py-6">
          <h1 className="text-2xl text-[#033987] font-bold">Manage User</h1>
          <div className="flex gap-8">
            <div className="border border-[#C6C61A] rounded-lg p-2 bg-[#C6C61A] text-white">
              <button
                className="flex items-center gap-2"
                onClick={handleAddButtonClick}
              >
                <FaPlus />
                Add User
              </button>
            </div>
            <div className="border border-[#C6C61A] rounded-lg p-2 bg-[#C6C61A] text-white">
              <button
                className="flex items-center gap-2"
                onClick={handleButtonClick}
              >
                <FaPlus />
                Import File
              </button>
              <input
                type="file"
                accept=".xlsx, .xls"
                ref={fileInputRef}
                onChange={handleImportFile}
                style={{ display: "none" }} // Hide the input file element
              />
            </div>
          </div>
        </div>

        <FormAddUser
          show={showPopup}
          handleClose={handleClosePopup}
          onSave={getUsers}
        />

        <FormEditUser
          show={showUpdate}
          handleClose={handleCloseUpdate}
          onSave={getUsers}
          user={user}
        />
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

      <div className="flex w-full justify-center mt-10">
        <Pagination
          current={pageIndex}
          pageSize={pageSize}
          total={totalItemsCount}
          showSizeChanger
          onChange={handlePageChange}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>

      {/* Loading, Success, and Error messages */}
      {isLoading && <div className="text-blue-500 mt-2">Uploading...</div>}
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-500 mt-2">{success}</div>}
    </div>
  );
};

export default ManageUser;
