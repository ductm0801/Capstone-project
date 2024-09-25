import { Button, Checkbox, Empty, message, Pagination, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const ListAthlete = ({ openPopup, handleClose, campaignId, onSave }) => {
  const showHideClassName = openPopup
    ? "popup display-block"
    : "popup display-none";
  const [competitors, setCompetitors] = useState([]);
  const [filteredCompetitors, setFilteredCompetitors] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedCompetitors, setSelectedCompetitors] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [rankFilter, setRankFilter] = useState(null);
  const [allSelected, setAllSelected] = useState(false);
  const jwtToken = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.get(
      `https://nhub.site/api/users/user-not-in-campaign/${campaignId}`,
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

  useEffect(() => {
    if (rankFilter) {
      const filtered = competitors.filter(
        (competitor) => competitor.rank == rankFilter
      );
      setFilteredCompetitors(filtered);
    } else {
      setFilteredCompetitors(competitors);
    }
  }, [rankFilter, competitors]);

  console.log(filteredCompetitors);

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

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setAllSelected(isChecked);
    if (isChecked) {
      const allIds = filteredCompetitors.map((competitor) => competitor.id);
      setSelectedCompetitors(allIds);
    } else {
      setSelectedCompetitors([]);
    }
  };

  const handleAction = async () => {
    try {
      const params = selectedCompetitors.map((competitorId) => ({
        userId: competitorId,
      }));

      const res = await axios.post(
        `https://nhub.site/api/athletes/user-athletes/${campaignId}`,
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
        handleClose();
        onSave();
      } else {
        console.error("Error adding competitors:", res.data);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const handleRankFilterChange = (value) => {
    setRankFilter(value);
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main max-w-[1050px] h-[800px] overflow-y-auto w-full">
        <h1 className="text-3xl font-semibold mb-4">List Athlete</h1>
        <button
          className="top-2 right-3 absolute text-3xl "
          onClick={handleClose}
        >
          &times;
        </button>

        <div className="mb-4">
          <Select
            placeholder="Filter by Rank"
            style={{ width: 200 }}
            onChange={handleRankFilterChange}
            allowClear
          >
            <Select.Option value="1">1.0</Select.Option>
            <Select.Option value="2">2.0</Select.Option>
            <Select.Option value="3">3.0</Select.Option>
            <Select.Option value="4">4.0</Select.Option>
            <Select.Option value="5">6.0</Select.Option>
            <Select.Option value="6">6.0</Select.Option>
            <Select.Option value="7">7.0</Select.Option>
            <Select.Option value="8">8.0</Select.Option>
            <Select.Option value="9">9.0</Select.Option>
            {/* Add more rank options as needed */}
          </Select>
        </div>

        <div className="flex justify-center">
          {filteredCompetitors.length > 0 ? (
            <table className="border border-1">
              <thead className="border border-1">
                <tr>
                  <th className="border border-slate-400 p-[20px] h-[56px]">
                    <Checkbox
                      checked={allSelected}
                      onChange={handleSelectAllChange}
                    />
                    Select All
                  </th>
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
                </tr>
              </thead>
              <tbody>
                {filteredCompetitors.map((competitor) => (
                  <tr key={competitor.id}>
                    <td className="border border-slate-300 px-[20px] h-[48px]">
                      <Checkbox
                        checked={selectedCompetitors.includes(competitor.id)}
                        onChange={(e) =>
                          handleCheckboxChange(competitor.id, e.target.checked)
                        }
                      />
                    </td>
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

export default ListAthlete;
