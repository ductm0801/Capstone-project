import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);

  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        "https://nhub.site/api/users/reset-password",
        {
          email: values.mail,
        }
      );

      if (res.status === 200) {
        toast.success(
          res.data?.message || "Password reset link sent to your email!"
        );
        setCountdown(60);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send password reset email."
      );
      console.error(error);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="flex justify-center items-center h-[100vh] bg-slate-200">
      <div className="flex flex-col bg-white p-8 rounded-lg">
        <h1 className="text-center text-3xl mb-4">Reset Password</h1>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label={<b>Enter your Email</b>}
            rules={[{ required: true, message: "Please input your Email!" }]}
            labelCol={{ span: 24 }}
            name="mail"
          >
            <Input
              addonBefore={<MailOutlined style={{ width: 30 }} />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit" disabled={countdown > 0}>
                {countdown > 0 ? `Resend in ${countdown}s` : "Submit"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
