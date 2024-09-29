import { Button, Form, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const UpdateCourt = ({
  open,
  handleClose,
  matchId,
  onSave,
  fetchSchedule,
  onSave2,
  fetchMatchesPaging,
}) => {
  const showHideClassName = open ? "popup display-block" : "popup display-none";
  const [form] = Form.useForm();
  const [courts, setCourts] = useState([]);
  const [courtValue, setCourtValue] = useState(null);

  const statusOptions = [
    { label: "Scheduling", value: "Scheduling" },
    { label: "In Progress", value: "InProgress" },
    { label: "Postponed", value: "Postponed" },
    // { label: "Canceled", value: "Canceled" },
  ];

  const fetchData = async () => {
    const res = await axios.get(
      `https://nhub.site/api/courts/court-available/${matchId}`
    );
    if (res.status === 200) {
      setCourts(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [matchId]);

  const onFinish = async (values) => {
    try {
      const res = await axios.put(
        `https://nhub.site/api/pickleball-match/match-status/${matchId}`,
        { matchStatus: courtValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        await Promise.allSettled([
          typeof onSave === "function" ? onSave() : Promise.resolve(),
          typeof onSave2 === "function" ? onSave2() : Promise.resolve(),
          typeof fetchSchedule === "function"
            ? fetchSchedule()
            : Promise.resolve(),
          typeof fetchMatchesPaging === "function"
            ? fetchMatchesPaging()
            : Promise.resolve(),
        ]);
        handleClose();
        message.success("Match Status updated successfully");
      }
    } catch (error) {
      console.error("Error updating court:", error);
      message.error(error?.response?.data || "An error occurred");
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">Update Status</h1>
        <button
          className="top-2 right-3 absolute text-3xl"
          onClick={handleClose}
        >
          &times;
        </button>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Status" labelCol={{ span: 24 }} name="matchStatus">
            <Select
              options={statusOptions}
              onChange={(value) => setCourtValue(value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default UpdateCourt;
