import { Button, Form, Input, message } from "antd";
import axios from "axios";

const EditCourtGroup = ({ open, handleClose, data, onSave }) => {
  // Destructure props here
  const showHideClassName = open ? "popup display-block" : "popup display-none";
  const [form] = Form.useForm();

  // Handle form submission
  const onFinish = async (values) => {
    try {
      // Call API to update the court group with the form values
      const res = await axios.put(
        `https://nhub.site/api/courtGroups/${data.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Show success message and close modal
      message.success("Court group updated successfully!");
      onSave();
      handleClose();
    } catch (e) {
      console.error("Error updating court group:", e);
      message.error("Failed to update court group. Please try again.");
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main h-[800px] w-[600px] overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">Edit Court Group</h1>
        <button
          className="top-2 right-3 absolute text-3xl"
          onClick={handleClose}
        >
          &times;
        </button>

        {/* Form for editing court group details */}
        <Form
          form={form}
          initialValues={data}
          onFinish={onFinish}
          layout="vertical" // Use vertical layout for form items
        >
          {/* Court Group Name */}
          <Form.Item
            label="Group Name"
            name="courtGroupName"
            rules={[
              { required: true, message: "Please input the group name!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="emailContact"
            rules={[
              { required: true, message: "Please input an email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input the phone number!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please input a valid phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Latitude */}
          <Form.Item
            label="Latitude"
            name="latitude"
            rules={[
              { required: true, message: "Please input the latitude!" },
              {
                pattern: /^-?\d+(\.\d+)?$/,
                message: "Please input a valid latitude!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Longitude */}
          <Form.Item
            label="Longitude"
            name="longitude"
            rules={[
              { required: true, message: "Please input the longitude!" },
              {
                pattern: /^-?\d+(\.\d+)?$/,
                message: "Please input a valid longitude!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Submit Button */}
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

export default EditCourtGroup;
