import { Button, DatePicker, Form, Input, message, Select } from "antd";
import bgImg from "../images/signup.png";
import FormItem from "antd/es/form/FormItem";
import moment from "moment";
import axios from "axios";

const Register = () => {
  const [form] = Form.useForm();
  const URL = "https://nhub.site/api/user-registration";

  const onFinish = async (values) => {
    const params = {
      ...values,
      dateOfBirth: moment(values.dateOfBirth.$d).format("DD-MM-YYYY"),
    };
    try {
      const res = await axios.post(URL, params);
      message.success("Form submitted successfully");
      form.resetFields();
    } catch (err) {
      message.error(err.response.data);
    }
  };
  return (
    <div
      className="py-[100px]"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-white text-3xl font-semibold flex justify-center mt-4">
        Register Page
      </h1>
      <div className="flex flex-col justify-center items-center my-10">
        <Form form={form} onFinish={onFinish}>
          <FormItem
            label={<b className="text-white">Full Name</b>}
            name="fullName"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input full name!",
              },
            ]}
          >
            <Input placeholder="Full Name" />
          </FormItem>
          <FormItem
            name="dateOfBirth"
            label={<b className="text-white">Date of birth</b>}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please select Date of birth!",
              },
            ]}
          >
            <DatePicker placeholder="Date of birth" />
          </FormItem>
          <FormItem
            label={<b className="text-white">Address</b>}
            name="address"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input address",
              },
            ]}
          >
            <Input placeholder="Address" />
          </FormItem>
          <FormItem
            label={<b className="text-white">Email</b>}
            name="email"
            labelCol={{ span: 24 }}
            rules={[
              {
                pattern: "",
                required: true,
                message: "Please input Email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </FormItem>
          <FormItem
            label={<b className="text-white">Phone Number</b>}
            name="phoneNumber"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input Phone Number",
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})/,
              },
            ]}
          >
            <Input placeholder="phone number" />
          </FormItem>
          <FormItem
            name="gender"
            label={<b className="text-white">Gender</b>}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select
              placeholder="Gender"
              options={[
                {
                  label: "Male",
                  value: "Male",
                },
                {
                  label: "Female",
                  value: "Female",
                },
              ]}
            />
          </FormItem>
          <div className="flex justify-center">
            <FormItem>
              <Button
                className="bg-[#C6C61A] text-white font-semibold border-[#C6C61A] w-[260px]"
                htmlType="submit"
              >
                Register
              </Button>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
