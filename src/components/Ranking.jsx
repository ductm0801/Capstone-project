import { message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Ranking = ({ tournamentId, fetchEliMatch }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchRankingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://nhub.site/${tournamentId}`, {
        params: {
          pageIndex,
          pageSize,
        },
      });
      if (response.status === 200) {
        setData(response.data.items);
        setTotalItemsCount(response.data.totalItemsCount);
      } else {
        message.error("Failed to fetch ranking data");
      }
    } catch (error) {
      console.error("Error fetching ranking data:", error);
      message.error("Error fetching ranking data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRankingData();
  }, [pageIndex, pageSize]);

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
    {
      title: "Wins",
      dataIndex: "matchWins",
      key: "matchWins",
    },
    {
      title: "Losses",
      dataIndex: "matchLosses",
      key: "matchLosses",
    },
    {
      title: "Set Difference",
      dataIndex: "setDifference",
      key: "setDifference",
    },
    {
      title: "Scores Difference",
      dataIndex: "scoresDifference",
      key: "scoresDifference",
    },
    {
      title: "Total Points",
      dataIndex: "totalPoints",
      key: "totalPoints",
    },
    {
      title: "Prize Money",
      dataIndex: "prizeMoney",
      key: "prizeMoney",
    },
  ];

  const handleTableChange = (pagination) => {
    setPageIndex(pagination.current - 1);
    setPageSize(pagination.pageSize);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Tournament Ranking</h1>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="teamId"
        loading={loading}
        pagination={{
          current: pageIndex + 1,
          pageSize: pageSize,
          total: totalItemsCount,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Ranking;
