import { Button, DatePicker, Form, message, Select } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const UpdateDate = ({
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
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleDateChange = (date, dateString) => {
    if (date) {
      const formattedDate = date.add(7, "hours").toISOString();
      setSelectedDate(formattedDate);
      console.log("Formatted Date:", formattedDate);
    } else {
      setSelectedDate(null);
    }
  };
  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const onFinish = async (values) => {
    try {
      const res = await axios.put(
        `https://nhub.site/api/pickleball-match/match-detail/${matchId}`,
        { matchDate: selectedDate, courtId: courtValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      handleClose();
      message.success("Detail updated successfully");
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
    } catch (e) {
      console.error("Error updating date:", e);
      message.error(e?.response?.data || "An error occurred");
    }
  };
  return (
    <div className={showHideClassName}>
      <section className="popup-main  overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">Update Date</h1>
        <button
          className="top-2 right-3 absolute text-3xl "
          onClick={handleClose}
        >
          &times;
        </button>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Date" name="matchDate">
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              showTime={{ format: "HH:mm" }}
              disabledDate={disabledDate}
              onChange={handleDateChange}
            />
          </Form.Item>
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
export default UpdateDate;
