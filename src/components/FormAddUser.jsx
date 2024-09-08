import { useEffect, useState } from "react";
import "../styles/formAddUser.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Form, Input, message, Select } from "antd";

const FormAddUser = ({ handleClose, show, onSave, loading }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const URL = "https://apis-pickleball.somee.com/api/users";
  const jwtToken = localStorage.getItem("token");

  const showHideClassName = show ? "popup display-block" : "popup display-none";

  const onFinish = async (data) => {
    try {
      const res = await axios.post(`${URL}`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("New User has been added successfully");
        onSave();
        form.resetFields();
        handleClose();
      }
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    handleClose();
  };

  useEffect(() => {
    form.setFieldsValue({
      fullName: "",
      address: "",
      email: "",
      phoneNumber: "",
      gender: "",
      rank: "",
      status: "",
    });
  }, [form]);

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <h1 className="text-3xl mb-4 text-[#033987] font-bold">Add New User</h1>
        <button className="close-button text-3xl " onClick={handleCancel}>
          &times;
        </button>
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            name="userName"
            label={<b>User Name</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter User Name" }]}
          >
            <Input placeholder="User Name" autoFocus />
          </Form.Item>
          <Form.Item
            name="password"
            label={<b>Password</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input placeholder="Password" autoFocus />
          </Form.Item>
          <Form.Item
            name="fullName"
            label={<b>Full Name</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Full Name" autoFocus />
          </Form.Item>
          <Form.Item
            name="email"
            label={<b>Email</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input type="email" placeholder="Email" autoFocus />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label={<b>Phone Number</b>}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please enter phone number",
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})/,
              },
            ]}
          >
            <Input placeholder="Phone Number" autoFocus />
          </Form.Item>
          <Form.Item
            name="rank"
            label={<b>Rank</b>}
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Please select rank" }]}
          >
            <Select
              placeholder="Please select rank"
              options={[
                { value: 1, label: "Rank 1" },
                { value: 2, label: "Rank 2" },
                { value: 3, label: "Rank 3" },
                { value: 4, label: "Rank 4" },
                { value: 5, label: "Rank 5" },
                { value: 6, label: "Rank 6" },
                { value: 7, label: "Rank 7" },
                { value: 8, label: "Rank 8" },
                { value: 9, label: "Rank 9" },
                { value: 10, label: "Rank 10" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="flex justify-center w-full bg-[#C6C61A]"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default FormAddUser;
