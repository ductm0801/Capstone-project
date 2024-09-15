import { Button, Checkbox, Empty, message, Pagination } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const ListAthleteTournament = ({
  openPopup,
  handleClose,
  tournamentId,
  onSave,
}) => {
  const showHideClassName = openPopup
    ? "popup display-block"
    : "popup display-none";
  const [competitors, setCompetitors] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedCompetitors, setSelectedCompetitors] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const jwtToken = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.get(
      `https://nhub.site/api/athletes/athletes-not-in-tournament/paging/${tournamentId}`,

      {
        params: {
          pageIndex: pageIndex - 1,
          pageSize,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    if (res.status === 200) {
      setCompetitors(res.data.items);
      setTotalItemsCount(res.data.totalItemsCount);
    } else {
      console.error(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setPageIndex(page);
    setPageSize(pageSize);
  };

  const handleCheckboxChange = (competitorId, isChecked) => {
    setSelectedCompetitors((prevSelected) =>
      isChecked
        ? [...prevSelected, competitorId]
        : prevSelected.filter((id) => id !== competitorId)
    );
  };

  const handleAction = async () => {
    try {
      const params = selectedCompetitors.map((competitorId) => ({
        athleteId: competitorId,
      }));

      const res = await axios.post(
        `https://nhub.site/api/athletes/athletes/${tournamentId}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        message.success("Successfully added");
        onSave();
        handleClose();
      } else {
        console.error("Error adding competitors:", res.data);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main max-w-[1050px] h-[800px] overflow-y-auto w-full">
        <h1 className="text-3xl font-semibold mb-4">List Athelte</h1>
        <button
          className="top-2 right-3 absolute text-3xl "
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="flex justify-center">
          {competitors.length > 0 ? (
            <table className="border border-1">
              <thead className="border border-1">
                <tr>
                  <th className="border border-slate-400 p-[20px] h-[56px]">
                    Select
                  </th>
                  <th className="border border-slate-400 p-[20px] h-[56px]">
                    Full Name
                  </th>
                  <th className="border border-slate-400 p-[20px] h-[56px]">
                    Role
                  </th>

                  <th className="border border-slate-400 p-[20px] h-[56px]">
                    Gender
                  </th>
                  <th className="border border-slate-400 p-[20px] h-[56px]">
                    Rank
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((competitor) => (
                  <tr key={competitor.id}>
                    <td className="border border-slate-300 px-[20px] h-[48px]">
                      <Checkbox
                        onChange={(e) =>
                          handleCheckboxChange(competitor.id, e.target.checked)
                        }
                      />
                    </td>
                    <td className="border border-slate-300 px-[20px] h-[48px]">
                      {competitor.athleteName}
                    </td>
                    <td className="border border-slate-300 px-[20px] h-[48px]">
                      {competitor.athleteType}
                    </td>

                    <td className="border border-slate-300 px-[20px] h-[48px]">
                      {competitor.gender}
                    </td>
                    <td className="border border-slate-300 px-[20px] h-[48px]">
                      {competitor.rank}
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
        </div>
        <div className="flex w-full justify-center mt-8">
          <Pagination
            current={pageIndex}
            pageSize={pageSize}
            total={totalItemsCount}
            showSizeChanger
            onChange={handlePageChange}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
        <div className="mt-4">
          <Button className="text-white bg-blue-500" onClick={handleAction}>
            Save
          </Button>
        </div>
      </section>
    </div>
  );
};
export default ListAthleteTournament;
