import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/formAddUser.css";
import { Button, Input, message, Select, Form } from "antd";

const FormEditUser = ({ show, handleClose, onSave, user }) => {
  const [form] = Form.useForm();
  const URL = "http://apis-pickleball.runasp.net/api/users/update-manager";
  const options = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `Rank ${i + 1}`,
  }));
  const showHideClassName = show ? "popup display-block" : "popup display-none";

  const onFinish = async (data) => {
    try {
      const res = await axios.put(`${URL}/${user.id}`, data);
      if (res.status === 204 || res.status === 201) {
        toast.success("User has been updated successfully");
        onSave();
        handleClose();
        form.resetFields();
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred while updating the user.";
      message.error(errorMsg);
    }
  };

  useEffect(() => {
    console.log("User object:", user);
    form.setFieldsValue({
      fullName: user.fullName,
      address: user.address,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      rank: user.rank,
      status: user.status,
    });
  }, [user, form]);

  const handleCancel = () => {
    handleClose();
    form.resetFields();
  };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <h1 className="text-3xl mb-4 text-[#033987] font-bold">Update User</h1>
        <button className="close-button text-3xl " onClick={handleCancel}>
          &times;
        </button>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="fullName"
            label={<b>Full Name</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Full Name" autoFocus />
          </Form.Item>
          <Form.Item
            name="address"
            label={<b>Address</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="email"
            label={<b>Email</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label={<b>Phone Number</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="gender"
            label={<b>Gender</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select
              placeholder="Please select gender"
              options={[
                {
                  value: "Male",
                  label: "Male",
                },
                { value: "Female", label: "Female" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="rank"
            label={<b>Rank</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please select rank" }]}
          >
            <Select placeholder="Please select rank" options={options} />
          </Form.Item>
          <Form.Item
            name="status"
            label={<b>Status</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select
              placeholder="Please select status"
              options={[
                {
                  value: 0,
                  label: "Active",
                },
                { value: 1, label: "Deactive" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="flex justify-center w-full bg-[#C6C61A]"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default FormEditUser;
