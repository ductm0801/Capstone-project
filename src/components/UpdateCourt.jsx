import { Button, Form, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const UpdateCourt = ({ open, handleClose, matchId }) => {
  const showHideClassName = open ? "popup display-block" : "popup display-none";
  const [form] = Form.useForm();
  const [courts, setCourts] = useState([]);
  const [courtValue, setCourtValue] = useState(null);

  const courtOptions = courts.map((c) => ({
    label: c.courtName,
    value: c.courtId,
  }));

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
        `https://nhub.site/api/pickleball-match/assign-court/${matchId}`,
        { courtId: courtValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        handleClose();
      }
    } catch (error) {
      console.error("Error updating court:", error);
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">Update Court</h1>
        <button
          className="top-2 right-3 absolute text-3xl"
          onClick={handleClose}
        >
          &times;
        </button>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Court" labelCol={{ span: 24 }} name="courtName">
            <Select
              options={courtOptions}
              onChange={(value) => setCourtValue(value)} // Update state with the selected court ID
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
