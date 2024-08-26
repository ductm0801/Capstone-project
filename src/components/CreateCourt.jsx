import { Button, Input, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";

const CreateCourt = ({ handleClose, show, onSave }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const [form] = Form.useForm();
  const URL = "http://localhost:5000/api/courtGroups";
  const jwtToken = localStorage.getItem("token");

  const onFinish = async (values) => {
    try {
      const res = await axios.post(URL, values, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      handleClose();
      onSave();
    } catch (e) {
      console.error("Error creating court group", e);
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <h1 className="text-3xl mb-4 text-[#033987] font-bold">
          Create Court Group
        </h1>
        <button className="close-button text-3xl " onClick={handleClose}>
          &times;
        </button>
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            label="Court Group Name"
            name="courtGroupName"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input Court Group Name!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input Address",
              },
            ]}
          >
            <Input className=" w-full" autoFocus />
          </Form.Item>
          <Form.Item
            label="Email"
            name="emailContact"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input Email",
              },
            ]}
          >
            <Input type="email" autoFocus />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please Phone Number",
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})/,
              },
            ]}
          >
            <Input type="text" autoFocus />
          </Form.Item>
          <Form.Item label="latitude" name="latitude" labelCol={{ span: 24 }}>
            <Input autoFocus />
          </Form.Item>
          <Form.Item label="longitude" name="longitude" labelCol={{ span: 24 }}>
            <Input autoFocus />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="px-8">
              Save
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};
export default CreateCourt;
