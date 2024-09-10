import { Button, Form, Input } from "antd";
import axios from "axios";

const CourtCreate = ({ open, handleClose, courtId }) => {
  const showHideClassName = open ? "popup display-block" : "popup display-none";
  const token = localStorage.getItem("token");

  const onFinish = async (values) => {
    // The values.courts is already in the format [{ courtName: "abc" }, { courtName: "cab" }]
    const courts = values.courts.filter(
      (court) => court.courtName && court.courtName.trim() !== ""
    ); // Filter out any empty court names

    if (courts.length === 0) {
      console.log("No valid court names to submit.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/courts/court/${courtId}`,
        courts, // Send only the valid court names array
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", res.data); // Handle success
    } catch (error) {
      console.error("Error posting data:", error); // Handle error
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main h-[800px] w-[600px] overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">Create Court</h1>
        <button
          className="top-2 right-3 absolute text-3xl"
          onClick={handleClose}
        >
          &times;
        </button>
        <Form onFinish={onFinish}>
          <Form.List name="courts">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key} style={{ marginBottom: "24px" }}>
                    <Form.Item
                      {...restField}
                      label={<b>Court Name</b>}
                      labelCol={{ span: 24 }}
                      name={[name, "courtName"]}
                      fieldKey={fieldKey}
                      rules={[
                        {
                          required: true,
                          message: "Please input court name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter court name" />
                    </Form.Item>
                    <Button type="danger" onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Court Name
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default CourtCreate;
