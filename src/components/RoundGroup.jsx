import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Select,
  Tabs,
} from "antd";
import React, { useEffect, useState } from "react";
import roundGroupbg from "../images/roundGroupbg.png";
import "../App.css";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Schedule from "./Schedule";
import { useForm } from "antd/es/form/Form";
import TournamentCompetitor from "./TournamentCompetitors";

const RoundGroup = () => {
  const [tables, setTables] = useState([]);
  const URL = "https://nhub.site/api/round";
  const URL2 = "https://nhub.site/api/round-group";
  const URL3 = "https://nhub.site/single-team";
  const URL4 = "https://nhub.site/api/team-group/ranked-team";
  const { id } = useParams();
  const [roundIds, setRoundIds] = useState([]);
  const [user, setUser] = useState([]);
  const [participants, setParticipants] = useState([]);
  const role = localStorage.getItem("role");
  const [matches, setMatches] = useState([]);
  const [roundId, setRoundId] = useState(null);
  const [round2Id, setRound2Id] = useState(null);
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [groupId, setGroupId] = useState(null);
  const [brackets, setBrackets] = useState([]);
  const location = useLocation();
  const { formatType } = location.state || {};
  const { tournamentId } = location.state || {};
  const navigate = useNavigate();

  const hide = () => {
    setOpen(false);
  };

  const isRound2 = () =>
    Array.isArray(roundIds) &&
    roundIds.some((round) => round.roundName === "Round 2");

  const isProgress = () =>
    Array.isArray(matches) &&
    matches.some((m) => m.matchStatus === "Completed");

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleCreateMatch = async (groupId) => {
    Modal.confirm({
      title: "Create Match",
      content:
        "Are you sure you want to create the match? Once the match is created, no more participants can be added to the bracket",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await axios.post(
            `https://nhub.site/api/pickleball-match/${groupId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (res.status === 200 || res.status === 201) {
            fetchMatch(roundId);
            message.success("Match was successfully created");
          }
        } catch (e) {
          message.error(e.response?.data?.message || "Failed to create match");
        }
      },
      onCancel() {
        message.info("Match creation canceled");
      },
    });
  };

  const isCompleted = () => {
    return matches.every((m) => m.matchStatus === "Completed");
  };

  const fetchMatch = async (roundId) => {
    try {
      const res = await axios.get(
        `https://nhub.site/api/pickleball-match/round/${roundId}`
      );
      setMatches(res.data);
    } catch (e) {
      console.error("Error fetching match:", e);
    }
  };

  useEffect(() => {
    if (roundIds.length > 0) {
      const roundId = roundIds[0].roundId;
      setRoundId(roundId);
      if (roundIds.length > 1) {
        const round2Id = roundIds[1].roundId;
        setRound2Id(round2Id);
      }
      fetchMatch(roundId);
    }
  }, [roundIds]);

  const fetchParticipants = async (roundId) => {
    try {
      const response = await axios.get(`${URL4}/${roundId}`);
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
    if (roundIds.length > 0) {
      const roundId = roundIds[0].roundId;
      fetchParticipants(roundId);
    }
  }, [roundIds]);

  const handleSave = async (roundGroupId, athleteId) => {
    try {
      const response = await axios.post(`${URL3}/${roundGroupId}`, {
        athleteId,
      });
      if (response.status === 200) {
        toast.success("Round Group saved successfully");
        fetchParticipants(roundId);
        fetchUser();
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

  const fetchTable = async (roundId) => {
    try {
      const response = await axios.get(`${URL2}/${roundId}`);
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
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://nhub.site/api/athletes/non-teams/${id}`
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

  const nextRound = async (values) => {
    const params = {
      ...values,
      tournamentId: id,
    };
    try {
      const res = await axios.post(
        "https://nhub.site/api/round/next-rounds",
        params,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        setBrackets(res.data);
        fetchData();
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to start next round"
      );
    }
  };

  const [numberOfTeams, setNumberOfTeams] = useState([]);

  const fetchPariticipantNextRound = async () => {
    try {
      const res = await axios.get(
        `https://nhub.site/api/team-group/advanced-team/${roundId}`
      );
      if (res.status === 200) {
        setNumberOfTeams(res.data);
      } else {
        message.error("Failed to fetch participants for the next round.");
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (roundIds.length > 0) {
      fetchTable(roundIds[0].roundId);
    }
  }, [roundIds]);

  const handleCreateTable = async () => {
    if (roundIds.length === 0 || !roundId) {
      console.error("No valid round ID available to create a new table.");
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
        `https://nhub.site/api/round-group/${roundId}`,
        queryParams
      );

      if (response.status === 200 || response.status === 201) {
        setTables([...tables, newTable]);
        fetchTable(roundId);
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

  const handleAddRowForDual = (roundGroupId) => {
    const updatedParticipants = { ...participants };

    const newDualTeam = {
      teamId: null,
      teamName: "",
      roundGroupId: roundGroupId,
      roundGroupName: "",
      teamRoundGroupId: null,
      matchWin: 0,
      matchDraw: 0,
      matchLose: 0,
      point: 0,
    };

    if (!updatedParticipants[roundGroupId]) {
      updatedParticipants[roundGroupId] = [];
    }

    updatedParticipants[roundGroupId].push(newDualTeam);
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
    } else {
      console.error(`Round group with ID ${roundGroupId} does not exist.`);
    }
  };

  const handleDualChange = (roundGroupId, teamIndex, athleteType, value) => {
    const updatedParticipants = { ...participants };

    if (updatedParticipants[roundGroupId]) {
      if (athleteType === "first") {
        updatedParticipants[roundGroupId][teamIndex].firstAthleteId = value;
      } else if (athleteType === "second") {
        updatedParticipants[roundGroupId][teamIndex].secondAthleteId = value;
      }
      setParticipants(updatedParticipants);
    } else {
      console.error(`Round group with ID ${roundGroupId} does not exist.`);
    }
  };

  const saveTeamAssignments = async (roundGroupId, teamIndex) => {
    const data = {
      firstAthleteId: participants[roundGroupId]?.[teamIndex]?.firstAthleteId,
      secondAthleteId: participants[roundGroupId]?.[teamIndex]?.secondAthleteId,
    };

    try {
      const response = await axios.post(
        `https://nhub.site/double-team/${roundGroupId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchParticipants(roundId);
        fetchUser();
      } else {
        console.error("Failed to assign teams", response.statusText);
      }
    } catch (error) {
      console.error(
        "Error occurred while assigning teams:",
        error.response || error.message
      );
    }
  };

  const handleDeleteTable = (tableIndex) => {
    const updatedTables = [...tables];
    updatedTables.splice(tableIndex, 1);
    setTables(updatedTables);
  };

  const handleClick = async () => {
    try {
      const res = await axios.get(
        `https://nhub.site/api/pickleball-match/next-rounds-match/${id}`
      );
      if (res.status === 200) {
        navigate(`/roundBracket/${id}`, {
          state: {
            data: res.data,
            formatType: formatType,
            tournamentId: tournamentId,
            roundId: roundId,
            round2Id: round2Id,
          },
        });
      }
    } catch (e) {
      message.error(
        e.response?.message || "Failed to proceed to the next round."
      );
    }
  };

  return (
    <>
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
          <div className="flex justify-end gap-4">
            {role === "Manager" && matches.length === 0 ? (
              <Button
                className="bg-blue-700 text-lg mt-4 py-[23px] px-6 text-white"
                onClick={handleCreateTable}
              >
                Create Table
              </Button>
            ) : (
              <>
                {role === "Manager" ? (
                  <>
                    {isRound2() ? (
                      <Button
                        className="bg-blue-700 text-lg mt-4 py-[23px] px-6 text-white"
                        onClick={() => handleClick()}
                      >
                        Next Round
                      </Button>
                    ) : (
                      <Popover
                        content={
                          <Form form={form} onFinish={nextRound}>
                            <Form.Item
                              name="numberOfTeams"
                              label="Number of teams to next round"
                              labelCol={{ span: 24 }}
                            >
                              <Select
                                options={numberOfTeams.map((num) => ({
                                  label: `${num} team`,
                                  value: num,
                                }))}
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                Submit
                              </Button>
                            </Form.Item>
                          </Form>
                        }
                        title="Choose number of teams to next round"
                        trigger="click"
                        placement="bottomRight"
                        open={open}
                        onOpenChange={handleOpenChange}
                      >
                        <Button
                          className="bg-blue-700 text-lg mt-4 py-[23px] px-6 text-white"
                          onClick={() => fetchPariticipantNextRound()}
                        >
                          Create Next round
                        </Button>
                      </Popover>
                    )}
                  </>
                ) : (
                  <Button
                    className="bg-blue-700 text-lg mt-4 py-[23px] px-6 text-white"
                    onClick={() => handleClick()}
                  >
                    Next Round
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {tables.map((table, tableIndex) => (
            <div key={tableIndex} className="mt-[32px]">
              <table className="w-[800px] border border-collapse border-[#C6C61A] bg-gradient-to-r from-[#1244A2] to-[#062764]">
                <thead className="text-white">
                  <tr className="border border-collapse border-[#C6C61A]">
                    <th className="w-[30px] border border-collapse border-[#C6C61A]">
                      Rank
                    </th>
                    <th className="w-[372px] border border-collapse border-[#C6C61A]">
                      {table.roundGroupName}
                    </th>
                    <th className="w-[80px] border border-collapse border-[#C6C61A]">
                      W - L
                    </th>

                    {role === "Manager" &&
                      Object.values(participants).some((group) =>
                        group.some((team) => !team.teamName)
                      ) && (
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
                          {teamIndex + 1}
                        </td>
                        <td className="border border-collapse border-[#C6C61A] py-4 text-white text-center">
                          {team.teamName ? (
                            team.teamName
                          ) : (
                            <div>
                              {role === "Manager" &&
                                (formatType === "MenSingles" ||
                                formatType === "WomenSingles" ? (
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
                                ) : (
                                  <div className="flex gap-4">
                                    <Select
                                      className="w-full text-white"
                                      placeholder={`First Athlete ${
                                        teamIndex + 1
                                      }`}
                                      onChange={(value) =>
                                        handleDualChange(
                                          table.roundGroupId,
                                          teamIndex,
                                          "first",
                                          value
                                        )
                                      }
                                      options={userOptions}
                                    />
                                    <Select
                                      className="w-full text-white"
                                      placeholder={`Second Athlete ${
                                        teamIndex + 1
                                      }`}
                                      onChange={(value) =>
                                        handleDualChange(
                                          table.roundGroupId,
                                          teamIndex,
                                          "second",
                                          value
                                        )
                                      }
                                      options={userOptions}
                                    />
                                  </div>
                                ))}
                            </div>
                          )}
                        </td>

                        <td className="border border-collapse border-[#C6C61A] text-white text-center">
                          {team.wins} - {team.losses}
                        </td>

                        {role === "Manager" && !team.teamName && (
                          <td className="border border-collapse border-[#C6C61A]">
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
                                {formatType === "MenSingles" ||
                                formatType === "WomenSingles" ? (
                                  <button
                                    className="bg-[#ABEFC6] text-green-700 font-semibold rounded-full px-2"
                                    onClick={() =>
                                      handleSave(
                                        table.roundGroupId,
                                        team.teamId
                                      )
                                    }
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button
                                    className="bg-[#ABEFC6] text-green-700 font-semibold rounded-full px-2"
                                    onClick={() =>
                                      saveTeamAssignments(
                                        table.roundGroupId,
                                        teamIndex
                                      )
                                    }
                                  >
                                    Save
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        )}
                      </tr>
                    )
                  )}
                </tbody>
                {role === "Manager" &&
                  matches.filter(
                    (match) => match.roundGroupId === table.roundGroupId
                  ).length === 0 && (
                    <tfoot>
                      <tr>
                        <td colSpan="5">
                          <div className="flex gap-4 my-[16px] justify-between px-4 w-full">
                            {formatType === "MenSingles" ||
                            formatType === "WomenSingles" ? (
                              <Button
                                className="bg-[#C6C61A] text-[#1244A2] font-semibold border-[#C6C61A]"
                                onClick={() => handleAddRow(table.roundGroupId)}
                              >
                                Add Team
                              </Button>
                            ) : (
                              <Button
                                className="bg-[#C6C61A] text-[#1244A2] font-semibold border-[#C6C61A]"
                                onClick={() =>
                                  handleAddRowForDual(table.roundGroupId)
                                }
                              >
                                Add Team
                              </Button>
                            )}

                            <Button
                              className="bg-green-200 text-[#1244A2] font-semibold border-green-200"
                              onClick={() =>
                                handleCreateMatch(table.roundGroupId)
                              }
                            >
                              Create Match
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
      <div className="container mx-auto mt-8">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Schedule" key="1">
            <Schedule
              match={matches}
              onSave={() => fetchParticipants(roundId)}
              onSave2={() => fetchMatch(roundId)}
              roundId={roundId}
              isCompleted={isCompleted()}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Competitors" key="2">
            <TournamentCompetitor
              tournamentId={id}
              onSave={() => fetchUser()}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default RoundGroup;
