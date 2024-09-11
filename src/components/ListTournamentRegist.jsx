import { Empty } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const ListTournamentRegis = ({ openPopup, handleClose, tournamentId }) => {
  const [competitors, setCompetitors] = useState([]);
  const jwtToken = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.get(
      `https://nhub.site/api/campaign-registration/campaign/${tournamentId}`
    );
    if (res.status === 200) {
      setCompetitors(res.data.data);
    } else {
      console.error(res.data);
    }
  };

  const handleAction = async (registId, action) => {
    try {
      await axios.put(
        `https://nhub.site/api/tournament-registration/${registId}`,
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
  useEffect(() => {
    fetchData();
  }, []);
  const showHideClassName = openPopup
    ? "popup display-block"
    : "popup display-none";
  return (
    <div className={showHideClassName}>
      <section className="popup-main max-w-[1050px] h-[800px] overflow-y-auto w-full">
        <h1 className="text-3xl font-semibold mb-4">List Registration</h1>
        <button
          className="top-2 right-3 absolute text-3xl "
          onClick={handleClose}
        >
          &times;
        </button>
        {competitors.length > 0 ? (
          <table className="border border-1">
            <thead className="border border-1">
              <tr>
                <th className="border border-slate-400 p-[20px] h-[56px]">
                  Full Name
                </th>
                <th className="border border-slate-400 p-[20px] h-[56px]">
                  Email
                </th>
                <th className="border border-slate-400 p-[20px] h-[56px]">
                  Phone Number
                </th>
                <th className="border border-slate-400 p-[20px] h-[56px]">
                  Gender
                </th>
                <th className="border border-slate-400 p-[20px] h-[56px]">
                  Rank
                </th>
                <th className="border border-slate-400 p-[20px] h-[56px]">
                  Status
                </th>
                <th className="border border-slate-400 p-[20px] h-[56px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((competitor) => (
                <tr key={competitor.id}>
                  <td className="border border-slate-300 px-[20px] h-[48px]">
                    {competitor.fullName}
                  </td>
                  <td className="border border-slate-300 px-[20px] h-[48px]">
                    {competitor.email}
                  </td>
                  <td className="border border-slate-300 px-[20px] h-[48px]">
                    {competitor.phoneNumber}
                  </td>
                  <td className="border border-slate-300 px-[20px] h-[48px]">
                    {competitor.gender}
                  </td>
                  <td className="border border-slate-300 px-[20px] h-[48px]">
                    {competitor.rank}
                  </td>
                  <td className="border border-slate-300 px-[20px] h-[48px]">
                    {competitor.registrationStatus}
                  </td>
                  <td className="border border-slate-300 pl-[20px] h-[48px]">
                    {competitor.registrationStatus === "WaitingApprove" && (
                      <div className="flex gap-2">
                        <span
                          className="status-item  border  rounded-full px-2 bg-[#fecdca] text-red-500"
                          onClick={() => handleAction(competitor.id, "dennied")}
                        >
                          <span className="status-dot dot-inactive"></span>
                          Deny
                        </span>
                        <span
                          className="status-item border  rounded-full px-2 bg-[#abefc6] text-green-500"
                          onClick={() =>
                            handleAction(competitor.id, "Approved")
                          }
                        >
                          <span className=" status-dot dot-active"></span>
                          Approve
                        </span>
                      </div>
                    )}
                    {competitor.registrationStatus === "dennied" && (
                      <div className="flex">
                        <span className="status-item  border  rounded-full px-2 bg-[#fecdca] text-red-500">
                          <span className="status-dot dot-inactive"></span>
                          Denied
                        </span>
                      </div>
                    )}
                    {competitor.registrationStatus === "Approved" && (
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
        ) : (
          <div className="mt-8">
            <Empty />
          </div>
        )}
      </section>
    </div>
  );
};
export default ListTournamentRegis;
