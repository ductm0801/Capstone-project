import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateCourt from "./CreateCourt";
import axios from "axios";

const Court = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [court, setCourt] = useState([]);
  const URL = "http://localhost:5000/api/courtGroups";

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      if (res.status === 200) {
        setCourt(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleClose = () => {
    setShowPopup(false);
  };
  return (
    <div>
      {showPopup && (
        <CreateCourt
          show={showPopup}
          handleClose={handleClose}
          onSave={fetchData}
        />
      )}

      <div className="relative">
        <h1 className="text-2xl text-[#033987] font-bold border-b border-[#C6C61A] mb-[32px] py-6">
          Manage Court Group
        </h1>
        <div className="absolute top-5 right-0 border border-[#C6C61A] rounded-lg p-2 bg-[#C6C61A] text-white">
          <button
            className="flex items-center gap-2"
            onClick={() => setShowPopup(true)}
          >
            <FaPlus />
            Add Court Group
          </button>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <table className="table-auto w-full text-left cursor-pointer">
            <thead className="text-white bg-[#155ABE] pl-[20px] h-[56px]">
              <tr>
                <th className="border border-slate-400 pl-[20px] h-[56px]">
                  Court Name
                </th>
                <th className="border border-slate-400 pl-[20px] h-[56px]">
                  Address
                </th>
                <th className="border border-slate-400 pl-[20px] h-[56px]">
                  Email Contact
                </th>
                <th className="border border-slate-400 pl-[20px] h-[56px]">
                  Phone Number
                </th>
                <th className="border border-slate-400 pl-[20px] h-[56px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {court.map((user, index) => (
                <tr
                  key={index}
                  //   onClick={() => handleUpdateButtonClick(user)}
                >
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    {user.courtGroupName}
                  </td>
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    {user.address}
                  </td>
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    {user.emailContact}
                  </td>
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    {user.phoneNumber}
                  </td>
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    <div
                      className={`status-item ${
                        user.isDeleted === false
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      <span
                        className={`status-dot ${
                          user.isDeleted === false
                            ? "dot-active"
                            : "dot-inactive"
                        }`}
                      ></span>
                      <span className="mr-[5px]">
                        {user.isDeleted === false ? "Active" : "Deactivate"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Court;
