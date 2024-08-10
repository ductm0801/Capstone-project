import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Dropdown, message } from "antd";
import EditModal from "./edit-condition-modal";
import CreateModal from "./create-condition-modal";
const items = [
  {
    key: "1",
    label: <div className="px-4">Edit</div>,
  },
  {
    key: "2",
    label: <div className="px-4">Delete</div>,
  },
];

const WinCondition = () => {
  const [winConditions, setWinConditions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [winCondition, setWinCondition] = useState({});
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const detail = useRef({});
  const [deleteModal, setDeleteModal] = useState(false);
  const URL =
    "https://pickleball-agdwcrbacmaea5fg.eastus-01.azurewebsites.net/api/win-condition";

  console.log(winConditions);

  const getWinConditions = async () => {
    try {
      const res = await axios.get(URL);
      if (res.status === 200) {
        console.log(res.data.data);
        setWinConditions(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddButtonClick = () => {
    setShowPopup(true);
  };

  const handleUpdateButtonClick = (user) => {
    setShowUpdate(true);
    setWinCondition(user);
  };

  const handleClosePopup = () => {
    setEdit(false);
  };
  const handleCloseCreatePopup = () => {
    setCreate(false);
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const handleClick = ({ key }, condition) => {
    switch (key) {
      case "1":
        {
          setEdit(true);
          detail.current = condition;
          message.info("edit");
        }
        break;
      case "2":
        {
          setDeleteModal(true);
          message.info("delete");
        }
        break;
    }
  };

  useEffect(() => {
    getWinConditions();
  }, []);

  return (
    <>
      {edit && (
        <EditModal
          show={edit}
          handleClose={handleClosePopup}
          data={detail.current}
          onSave={getWinConditions}
        />
      )}
      {create && (
        <CreateModal
          show={create}
          handleClose={handleCloseCreatePopup}
          onSave={getWinConditions}
        />
      )}
      <div className="flex flex-col px-[32px]">
        <div className="relative">
          <h1 className="text-2xl text-[#033987] font-bold border-b border-[#C6C61A] mb-[32px] py-6">
            Manage Win Condition
          </h1>
          <div className="absolute top-5 right-0 border border-[#C6C61A] rounded-lg p-2 bg-[#C6C61A] text-white">
            <button
              className="flex items-center gap-2"
              onClick={() => setCreate(true)}
            >
              <FaPlus />
              Add Win Condition
            </button>
          </div>
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
                  Condition Name
                </th>
                <th className="border border-slate-400 pl-[20px] h-[56px]">
                  Description
                </th>
                <th className="border border-slate-400 pl-[20px] h-[56px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {winConditions.length > 0 &&
                winConditions.map((condition, index) => (
                  <tr
                    key={index}
                    onClick={() => handleUpdateButtonClick(condition)}
                  >
                    <td className="border border-slate-300 pl-[20px] h-[48px]">
                      {condition.conditionName}
                    </td>
                    <td className="border border-slate-300 pl-[20px] h-[48px]">
                      {condition.description}
                    </td>
                    <td className="border border-slate-300 pl-[20px] h-[48px]">
                      <Dropdown
                        menu={{
                          items,
                          onClick: (e) => handleClick(e, condition),
                        }}
                        placement="bottomLeft"
                      >
                        <BsThreeDotsVertical />
                      </Dropdown>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WinCondition;
