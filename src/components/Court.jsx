import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateCourt from "./CreateCourt";
import axios from "axios";
import CourtCreate from "./CourtCreateModal";
import { Button } from "antd";
import EditCourtGroup from "./EditCourtGroup";

const Court = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [courtGroups, setCourtGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [addCourt, setAddCourt] = useState(false);
  const [courtGroup, setCourtGroup] = useState(null);
  const [courtId, setCourtId] = useState(null);
  const [courts, setCourts] = useState([]);
  const [edit, setEdit] = useState(false);
  const URL = "https://nhub.site/api/courtGroups";
  const jwtToken = localStorage.getItem("token");

  const fetchCourtGroups = async () => {
    try {
      const res = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res.status === 200) {
        setCourtGroups(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourtsByGroupId = async (groupId) => {
    try {
      const res = await axios.get(
        `https://nhub.site/api/courts/court-group/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (res.status === 200) {
        setCourts(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (index) => {
    const selectedGroupId = courtGroups[index].courtId;
    setCourtId(selectedGroupId);
    setOpen(true);
    fetchCourtsByGroupId(selectedGroupId);
  };

  useEffect(() => {
    fetchCourtGroups();
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleEdit = (index) => {
    setEdit(true);
    setCourtGroup(courtGroups[index]);
  };
  return (
    <div>
      {showPopup && (
        <CreateCourt
          show={showPopup}
          handleClose={handleClose}
          onSave={fetchCourtGroups}
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
                  Court Group Name
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
                <th className="border border-slate-400 pl-[20px] h-[56px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {courtGroups.map((group, index) => (
                <tr key={index}>
                  <td
                    className="border border-slate-300 pl-[20px] h-[48px]"
                    onClick={() => handleClick(index)}
                  >
                    {group.courtGroupName}
                  </td>
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    {group.address}
                  </td>
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    {group.emailContact}
                  </td>
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    {group.phoneNumber}
                  </td>
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    <div
                      className={`status-item ${
                        group.isDeleted === false
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      <span
                        className={`status-dot ${
                          group.isDeleted === false
                            ? "dot-active"
                            : "dot-inactive"
                        }`}
                      ></span>
                      <span className="mr-[5px]">
                        {group.isDeleted === false ? "Active" : "Deactivate"}
                      </span>
                    </div>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="text-white bg-[#155ABE] px-10 py-2 rounded-lg hover:bg-[#033987]"
                      onClick={() => setAddCourt(true)}
                    >
                      Add Courts
                    </button>
                    <button
                      className="text-white bg-neutral-400 px-10 py-2 rounded-lg hover:bg-[#033987]"
                      onClick={() => handleEdit(index)}
                    >
                      Edit CourtGroup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {open && courts.length > 0 && (
          <div>
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-[#033987] font-bold mb-4">
                  Courts in Group (total: {courts.length})
                </h2>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </div>
              <div className="overflow-hidden rounded-lg border">
                <table className="table-auto w-full text-left cursor-pointer">
                  <thead className="text-white bg-[#155ABE] pl-[20px] h-[56px]">
                    <tr>
                      <th className="border border-slate-400 pl-[20px] h-[56px]">
                        Court Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courts.map((court, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 pl-[20px] h-[48px]">
                          {court.courtName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {addCourt && (
        <CourtCreate
          open={addCourt}
          handleClose={() => setAddCourt(false)}
          courtId={courtId}
        />
      )}
      {edit && (
        <EditCourtGroup
          open={edit}
          handleClose={() => setEdit(false)}
          data={courtGroup}
          onSave={fetchCourtGroups}
        />
      )}
    </div>
  );
};

export default Court;
