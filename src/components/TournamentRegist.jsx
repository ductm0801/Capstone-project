import { Button, Form, Input, message } from "antd";
import popImg from "../images/signup.png";
import logo from "../images/menu_logo.png";
import axios from "axios";

const TournamentRegist = ({ handleClose, show, onSave, tournamentId }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        `https://nhub.site/api/tournament-registration/guest?tournamentId=${tournamentId}`,

        {
          ...values,
        }
      );
      message.success(
        res.data?.message ||
          "Your registration is sent successfully! Please wait for approval!"
      );
      handleClose();
      onSave();
    } catch (error) {
      message.error(error?.message?.data);
    }
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
              onClick={handleClose}
            >
              &times;
            </button>
            <Form onFinish={handleSubmit}>
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
export default TournamentRegist;
