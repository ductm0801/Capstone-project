import { Button, Form, Input } from "antd";
import axios from "axios";

const CreateModal = ({ handleClose, show, onSave }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const URL = "http://localhost:5000/api/win-condition";
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await axios.post(`${URL}`, values);
      if (res.status === 200) {
        handleClose();
        onSave();
      } else {
        console.error("Failed to create win condition:", res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <h1 className="text-3xl mb-4 text-[#033987] font-bold">
          Create Win Condition
        </h1>
        <button className="close-button text-3xl " onClick={handleClose}>
          &times;
        </button>
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            label="Win Condition Name"
            name="conditionName"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input win condition!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Win Condition Description"
            name="description"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input win condition!",
              },
            ]}
          >
            <TextArea className=" w-full" />
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

export default CreateModal;
