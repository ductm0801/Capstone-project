import React from "react";
import logo from "../images/menu_logo.png";
import "../styles/signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import popImg from "../images/signup.png";
import { Button, Form, Input, message, Select } from "antd";

const SignUp = ({ closePopup, show, onSave, campaignId }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";
  const { id } = useParams();
  const baseURL = `https://nhub.site/api/campaign-registration/guest/${campaignId}`;

  const handleSubmit = async (values) => {
    try {
      let res = await axios.post(baseURL, {
        ...values,
        tournamentCampaignId: parseInt(id),
      });
      message.success(
        res.data?.message ||
          "Your registration is sent successfully! Please wait for approval!"
      );
      closePopup();
      onSave();
    } catch (error) {}
  };

  return (
    <div className={showHideClassName}>
      <section
        className="popup-main max-w-[600px] w-full"
        style={{
          background: `url(${popImg})`,
        }}
      >
        <div>
          <img className="block m-auto" src={logo} alt=""></img>

          <div>
            <h2 className="text-3xl text-white font-bold m-8">
              Tournament Register{" "}
            </h2>
            <button
              className="text-white top-2 right-3 absolute text-3xl "
              onClick={closePopup}
            >
              &times;
            </button>
            <Form onFinish={handleSubmit}>
              <Form.Item
                label={<b className="text-white">Full Name</b>}
                name="fullName"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input full name",
                  },
                ]}
              >
                <Input autoFocus />
              </Form.Item>
              <Form.Item
                label={<b className="text-white">Email</b>}
                name="email"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<b className="text-white">Phone Number</b>}
                name="phoneNumber"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input phone number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<b className="text-white">Gender</b>}
                name="gender"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please select gender",
                  },
                ]}
              >
                <Select
                  options={[
                    { value: "Male", label: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label={<b className="text-white">Rank</b>}
                name="rank"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please select rank",
                  },
                ]}
              >
                <Select
                  placeholder="Select Rank "
                  options={[
                    { label: "Rank 1", value: 1 },
                    { label: "Rank 2", value: 2 },
                    { label: "Rank 3", value: 3 },
                    { label: "Rank 4", value: 4 },
                    { label: "Rank 5", value: 5 },
                    { label: "Rank 6", value: 6 },
                    { label: "Rank 7", value: 7 },
                    { label: "Rank 8", value: 8 },
                    { label: "Rank 9", value: 9 },
                    { label: "Rank 10", value: 10 },
                  ]}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="text-white py-2 px-4 bg-[#C6C61A] rounded-lg mt-6 mx-[80px]"
                  type="primary"
                  htmlType="submit"
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
