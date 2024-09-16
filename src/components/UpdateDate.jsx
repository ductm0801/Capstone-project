import { Button, DatePicker, Form } from "antd";
import axios from "axios";
import moment from "moment";
import { useState } from "react";

const UpdateDate = ({ open, handleClose, matchId, onSave }) => {
  const showHideClassName = open ? "popup display-block" : "popup display-none";
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);

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
    const res = await axios.put(
      `https://nhub.site/api/pickleball-match/match-date/${matchId}`,
      { matchDate: selectedDate },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    handleClose();
    onSave();
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
