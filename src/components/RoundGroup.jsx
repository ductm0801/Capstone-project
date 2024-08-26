import { Button, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import roundGroupbg from "../images/roundGroupbg.png";

import "../App.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const RoundGroup = () => {
  const [tables, setTables] = useState([]);
  const URL = "http://localhost:5000/api/round";
  const URL2 = "http://localhost:5000/api/round-group";
  const URL3 = "http://localhost:5000/single-team";
  const URL4 = "http://localhost:5000/api/team-group/ranked-team";
  const { id } = useParams();
  const [roundIds, setRoundIds] = useState([]);
  const [user, setUser] = useState([]);
  const [participants, setParticipants] = useState([]);
  const role = localStorage.getItem("role");

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`${URL4}/${id}`);
      if (response.status === 200) {
        setParticipants(response.data);
      } else {
        console.error("Failed to fetch participants");
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };
  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleSave = async (roundGroupId, athleteId) => {
    try {
      const response = await axios.post(`${URL3}/${roundGroupId}`, {
        athleteId,
      });
      if (response.status === 200) {
        toast.success("Round Group saved successfully");
        fetchTable();
        fetchParticipants();
      } else {
        toast.error("Failed to save Round Group");
      }
    } catch (error) {
      console.error("Error saving Round Group:", error);
    }
  };

  const getParticipantsByRoundGroupId = (roundGroupId) => {
    return participants[roundGroupId] || [];
  };

  const fetchTable = async () => {
    try {
      const response = await axios.get(`${URL2}/${id}`);
      if (response.status === 200) {
        setTables(response.data);
      } else {
        console.error("Failed to fetch tables");
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };
  useEffect(() => {
    fetchTable();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/athletes/non-teams/${id}`
      );
      if (response.status === 200) {
        setUser(response.data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      if (response.status === 200) {
        setRoundIds(response.data.data);
      } else {
        console.error("Failed to fetch rounds");
      }
    } catch (error) {
      console.error("Error fetching rounds:", error);
    }
  };
  const roundIdObject = roundIds.reduce((acc, item) => {
    acc[item.roundId] = item;
    return acc;
  }, {});

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTable = async () => {
    const roundId = roundIds[0]?.roundId;

    if (!roundId) {
      console.error("No valid roundId found for the new table.");
      return;
    }

    const newTable = {
      groupName: `Group ${String.fromCharCode(65 + tables.length)}`,
      teams: [],
    };

    const queryParams = {
      roundGroupName: newTable.groupName,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/round-group/${roundId}`,
        queryParams
      );

      if (response.status === 200 || response.status === 201) {
        setTables([...tables, newTable]);
        fetchTable();
      } else {
        console.error(
          "Failed to create round group, response status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error creating round group:", error.message);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const userOptions = user.map((u) => {
    return {
      label: u.athleteName,
      value: u.id,
    };
  });

  const handleAddRow = (roundGroupId) => {
    const updatedParticipants = { ...participants };
    const newTeam = {
      teamId: null,
      teamName: "",
      wins: 0,
      losses: 0,
      draws: 0,
      points: 0,
      setDifference: 0,
      pointsDifference: 0,
      teamStatus: null,
    };
    if (!updatedParticipants[roundGroupId]) {
      updatedParticipants[roundGroupId] = [];
    }
    updatedParticipants[roundGroupId].push(newTeam);
    setParticipants(updatedParticipants);
  };

  const handleDeleteRow = (roundGroupId, teamIndex) => {
    const updatedParticipants = { ...participants };
    if (updatedParticipants[roundGroupId]) {
      updatedParticipants[roundGroupId].splice(teamIndex, 1);
      setParticipants(updatedParticipants);
    } else {
      console.error(`Round group with ID ${roundGroupId} does not exist.`);
    }
  };

  const handleTeamNameChange = (roundGroupId, teamIndex, value) => {
    const updatedParticipants = { ...participants };
    if (updatedParticipants[roundGroupId]) {
      updatedParticipants[roundGroupId][teamIndex].teamId = value;
      setParticipants(updatedParticipants);
      console.log("Updated participants:", updatedParticipants);
    } else {
      console.error(`Round group with ID ${roundGroupId} does not exist.`);
    }
  };

  const handleDeleteTable = (tableIndex) => {
    const updatedTables = [...tables];
    updatedTables.splice(tableIndex, 1);
    setTables(updatedTables);
  };

  return (
    <div
      className="py-[100px] px-[64px] h-full"
      style={{
        backgroundImage: `url(${roundGroupbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-between items-center text-3xl font-semibold text-white">
        PickleBall Round Group
        {role === "Manager" && (
          <Button
            className="bg-blue-700 text-lg mt-4 py-[23px] px-6 text-white"
            onClick={handleCreateTable}
          >
            Create Table
          </Button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className="mt-[32px]">
            <table className="w-[800px] border border-collapse border-[#C6C61A] bg-gradient-to-r from-[#1244A2] to-[#062764]">
              <thead className="text-white">
                <tr className="border border-collapse border-[#C6C61A]">
                  <th className="w-[372px] border border-collapse border-[#C6C61A]">
                    {table.roundGroupName}
                  </th>
                  <th className="w-[80px] border border-collapse border-[#C6C61A]">
                    W - L
                  </th>
                  {role === "Manager" && (
                    <th className="w-[140px] border border-collapse border-[#C6C61A]">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {getParticipantsByRoundGroupId(table.roundGroupId).map(
                  (team, teamIndex) => (
                    <tr key={teamIndex}>
                      <td className="border border-collapse border-[#C6C61A] py-4 text-white text-center">
                        {team.teamName ? (
                          team.teamName
                        ) : (
                          <div>
                            {role === "Manager" && (
                              <Select
                                className="w-full text-white"
                                placeholder={`Team ${teamIndex + 1}`}
                                onChange={(value) =>
                                  handleTeamNameChange(
                                    table.roundGroupId,
                                    teamIndex,
                                    value
                                  )
                                }
                                options={userOptions}
                              />
                            )}
                          </div>
                        )}
                      </td>

                      <td className="border border-collapse border-[#C6C61A] text-white text-center">
                        {team.wins} - {team.losses}
                      </td>
                      {role === "Manager" && (
                        <td className="border border-collapse border-[#C6C61A]">
                          {team.teamName ? (
                            <div>
                              <div className="flex gap-2 justify-center">
                                <button className="bg-blue-300 text-blue-700 font-semibold  rounded-full px-2">
                                  Update
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex gap-2 justify-center">
                                <button
                                  className="bg-[#FECDCA] text-red-700 font-semibold  rounded-full px-2"
                                  onClick={() =>
                                    handleDeleteRow(
                                      table.roundGroupId,
                                      teamIndex
                                    )
                                  }
                                >
                                  Delete
                                </button>
                                <button
                                  className="bg-[#ABEFC6] text-green-700 font-semibold rounded-full px-2"
                                  onClick={() =>
                                    handleSave(table.roundGroupId, team.teamId)
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  )
                )}
              </tbody>
              {role === "Manager" && (
                <tfoot>
                  <tr>
                    <td colSpan="3">
                      <div className="flex gap-4 my-[16px] justify-center w-full">
                        <Button
                          className="text-[#1244A2] font-semibold"
                          onClick={() => handleDeleteTable(tableIndex)}
                        >
                          Delete Table
                        </Button>
                        <Button
                          className="bg-[#C6C61A] text-[#1244A2] font-semibold border-[#C6C61A]"
                          onClick={() => handleAddRow(table.roundGroupId)}
                        >
                          Add Team
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundGroup;
