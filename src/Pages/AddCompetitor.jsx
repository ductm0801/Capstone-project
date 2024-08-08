import { Checkbox } from "antd";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddCompetitor = () => {
  const [activeTab, setActiveTab] = useState("Participants");
  const navigate = useNavigate();
  const location = useLocation();
  const { formatType } = location.state || {};
  const { tournamentId } = useParams("");
  console.log(formatType);

  const onClickBracket = () => {
    navigate(`/bracket/${tournamentId}`, {
      state: {
        formatType: formatType,
        tournamentId: tournamentId,
      },
    });
  };
  console.log(tournamentId);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="pt-[100px] pb-[100px] bg-[#E5E5E5]">
      <div className="flex justify-end mb-[36px] mr-[80px]">
        <button
          className="border rounded-lg border-[#C6C61A] bg-[#C6C61A] text-white px-8 py-2"
          onClick={() => onClickBracket()}
        >
          Go to Bracket
        </button>
      </div>
      <div className="flex justify-center gap-0 ">
        <h1
          className={`text-3xl w-full mr-0 ml-16 rounded-tl-[16px] bg-white text-center font-bold pt-4 text-[#033987] cursor-pointer ${
            activeTab === "Participants"
              ? "border-t-2 border-l-2 rounded-tl-[16px] border-[#C6C61A] "
              : ""
          }`}
          onClick={() => handleTabClick("Participants")}
        >
          List Participants
        </h1>
        <h1
          className={`text-3xl w-full bg-white mr-16 ml-0  rounded-tr-[16px] text-center font-bold pt-4 text-[#033987] cursor-pointer ${
            activeTab === "Register"
              ? "border-t-2 border-r-2   rounded-tr-[16px]  border-[#C6C61A]"
              : ""
          }`}
          onClick={() => handleTabClick("Register")}
        >
          List Register
        </h1>
      </div>
      <div
        className={`tab-item ${
          activeTab === "Participants" ? "" : "hidden"
        } mb-[12px]`}
        id="Participants"
      >
        <div className="mx-16">
          <table className="table-auto w-full rounded-lg border  border-collapse text-left cursor-pointer">
            <thead>
              <tr className="text-center border bg-[#155ABE] text-white">
                <th className="py-3 border-collapse border">Name</th>
                <th className="py-3 border-collapse border">Phone</th>
                <th className="py-3 border-collapse border">Rank</th>
                <th className="py-3 border-collapse border">Gender</th>
                <th className="py-3 border-collapse border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center bg-white">
                <td className="py-3 border-b-2 border-collapse">Ductm</td>
                <td className="py-3 border-b-2 border-collapse">0938591320</td>
                <td className="py-3 border-b-2 border-collapse">1</td>
                <td className="py-3 border-b-2 border-collapse">Male</td>
                <td className="py-3 border-b-2 border-collapse">
                  <Checkbox />
                </td>
              </tr>
              <tr className="text-center bg-white">
                <td className="py-3 border-b-2 border-collapse">Ductm</td>
                <td className="py-3 border-b-2 border-collapse">0938591320</td>
                <td className="py-3 border-b-2 border-collapse">1</td>
                <td className="py-3 border-b-2 border-collapse">Male</td>
                <td className="py-3 border-b-2 border-collapse">
                  <Checkbox />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end">
            <button className="px-12 py-2 border border-[#C6C61A] text-white bg-[#C6C61A] rounded-lg mt-[32px]">
              Apply
            </button>
          </div>
        </div>
      </div>
      <div
        className={`tab-item ${
          activeTab === "Register" ? "" : "hidden"
        } mb-[12px]`}
        id="Register"
      >
        <div className="mx-16">
          <table className="table-auto w-full rounded-lg border  border-collapse text-left cursor-pointer">
            <thead>
              <tr className="text-center border bg-[#155ABE] text-white">
                <th className="py-3 border-collapse border">Name</th>
                <th className="py-3 border-collapse border">Phone</th>
                <th className="py-3 border-collapse border">Rank</th>
                <th className="py-3 border-collapse border">Gender</th>
                <th className="py-3 border-collapse border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-3 border-b-2 border-collapse">Ductm</td>
                <td className="py-3 border-b-2 border-collapse">0938591320</td>
                <td className="py-3 border-b-2 border-collapse">1</td>
                <td className="py-3 border-b-2 border-collapse">Male</td>
                <td className="py-3 border-b-2 border-collapse">
                  <div className="flex gap-4 justify-center">
                    <button className="px-2 border rounded-lg bg-[#ABEFC6] text-[#067647]">
                      Aprrove
                    </button>
                    <button className="px-2 border rounded-lg bg-[#FECDCA] text-[#B42318]">
                      Deny
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="text-center">
                <td className="py-3 border-b-2 border-collapse">Ductm</td>
                <td className="py-3 border-b-2 border-collapse">0938591320</td>
                <td className="py-3 border-b-2 border-collapse">1</td>
                <td className="py-3 border-b-2 border-collapse">Male</td>
                <td className="py-3 border-b-2 border-collapse">
                  <div className="flex gap-4 justify-center">
                    <button className="px-2 border rounded-lg bg-[#ABEFC6] text-[#067647]">
                      Aprrove
                    </button>
                    <button className="px-2 border rounded-lg bg-[#FECDCA] text-[#B42318]">
                      Deny
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AddCompetitor;
