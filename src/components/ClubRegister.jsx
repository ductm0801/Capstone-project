import React, { useState } from "react";
import "../styles/manager.css";
const ClubRegister = () => {
  const initialRows = [
    {
      name: "TMD0801",
      email: "TMD@gmail.com",
      phone: "0123456789",
      rank: "1.0",
      action: null,
    },
    {
      name: "TMD0801",
      email: "TMD@gmail.com",
      phone: "0123456789",
      rank: "1.0",
      action: null,
    },
  ];

  const [rows, setRows] = useState(initialRows);

  const handleAction = (index, action) => {
    const newRows = [...rows];
    newRows[index].action = action;
    setRows(newRows);
  };

  return (
    <div className="flex flex-col px-[32px]">
      <div className="relative">
        <h1 className="text-2xl text-[#033987] font-bold border-b border-[#C6C61A] mb-[32px] py-6">
          Tournament Register
        </h1>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <table className="table-auto w-full text-left">
          <thead className="text-white bg-[#155ABE] pl-[20px] h-[56px]">
            <tr>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Name
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.name}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.email}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.phone}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.rank}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.action === null && (
                    <div className="flex gap-2">
                      <span
                        className="status-item  border  rounded-full px-2 bg-[#fecdca] text-red-500"
                        onClick={() => handleAction(index, "deny")}
                      >
                        <span className="status-dot dot-inactive"></span>
                        Deny
                      </span>
                      <span
                        className="status-item border  rounded-full px-2 bg-[#abefc6] text-green-500"
                        onClick={() => handleAction(index, "approve")}
                      >
                        <span className=" status-dot dot-active"></span>
                        Approve
                      </span>
                    </div>
                  )}
                  {row.action === "deny" && (
                    <div className="flex">
                      <span className="status-item  border  rounded-full px-2 bg-[#fecdca] text-red-500">
                        <span className="status-dot dot-inactive"></span>
                        Denied
                      </span>
                    </div>
                  )}
                  {row.action === "approve" && (
                    <div className="flex">
                      <span className="status-item border  rounded-full px-2 bg-[#abefc6] text-green-500">
                        <span className=" status-dot dot-active"></span>
                        Approved
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClubRegister;
