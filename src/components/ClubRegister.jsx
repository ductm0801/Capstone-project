import React, { useEffect, useState } from "react";
import "../styles/manager.css";
import axios from "axios";
import { Button, message, Pagination } from "antd";
import moment from "moment";
const ClubRegister = () => {
  const [data, setData] = useState([]);
  const jwtToken = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://nhub.site/api/user-registration/paging",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            pageIndex: page - 1,
            pageSize,
          },
        }
      );
      setData(response.data.items);
      setTotalItemsCount(response.data.totalItemsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);
  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleAction = async (id, action) => {
    try {
      await axios.put(
        `https://nhub.site/api/user-registration/${id}`,
        { status: action },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error updating action:", error);
    }
  };

  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  };

  const handleCreate = async (email, userId) => {
    const randomPassword = generateRandomPassword();

    try {
      await axios.post(
        `https://nhub.site/api/accounts/account/${userId}`,
        { userName: email, password: randomPassword },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      fetchData();
      message.success("User created successfully!");
    } catch (error) {
      console.error("Error creating new user:", error);
    }
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
                Address
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                gender
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
            {data.map((row, index) => (
              <tr key={index}>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.fullName}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.email}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.phoneNumber}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {moment(row.dateOfBirth).format("DD-MM-YYYY")}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.address}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.gender}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {row.status === "WaitingApprove" && (
                    <div className="flex gap-2">
                      <span
                        className="status-item  border  rounded-full px-2 bg-[#fecdca] text-red-500"
                        onClick={() => handleAction(row.id, "dennied")}
                      >
                        <span className="status-dot dot-inactive"></span>
                        Deny
                      </span>
                      <span
                        className="status-item border  rounded-full px-2 bg-[#abefc6] text-green-500"
                        onClick={() => handleAction(row.id, "Approved")}
                      >
                        <span className=" status-dot dot-active"></span>
                        Approve
                      </span>
                    </div>
                  )}
                  {row.status === "dennied" && (
                    <div className="flex">
                      <span className="status-item  border  rounded-full px-2 bg-[#fecdca] text-red-500">
                        <span className="status-dot dot-inactive"></span>
                        Denied
                      </span>
                    </div>
                  )}
                  {row.status === "Approved" && (
                    <div className="flex">
                      <span className="status-item border  rounded-full px-2 bg-[#abefc6] text-green-500">
                        <span className=" status-dot dot-active"></span>
                        Approved
                      </span>
                    </div>
                  )}
                </td>
                {row.status === "Approved" && (
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    <Button
                      className="bg-[#C6C61A] text-white border-[#C6C61A]"
                      onClick={() => handleCreate(row.email, row.userId)}
                    >
                      Create Account
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full justify-end mt-4">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalItemsCount}
          showSizeChanger
          onChange={handlePageChange}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    </div>
  );
};

export default ClubRegister;
