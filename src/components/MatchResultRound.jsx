import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";

const MatchResultRound = ({
  openPopup,
  handleClose,
  set,
  onSave,
  onSave2,
  onSave3,
  onSave4,
}) => {
  const showHideClassName = openPopup
    ? "popup display-block"
    : "popup display-none";
  const [form] = useForm();

  const onFinish = async (values, setId) => {
    try {
      const payload = {
        firstTeamScore: values[`firstTeamScore_${setId}`],
        secondTeamScore: values[`secondTeamScore_${setId}`],
      };

      const res = await axios.put(
        `https://nhub.site/api/accounts/${setId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Match result updated successfully!");
      onSave3();
      onSave4();
      handleClose();
      console.log(`Set ${setId} updated successfully`, res.data);
    } catch (error) {
      message.error(error.response?.data);
    }
  };

  const handleSave = (setId) => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values, setId);
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const initialValues = {};
  set.forEach((s) => {
    initialValues[`firstTeamScore_${s.setId}`] = s.firstTeamScore || "";
    initialValues[`secondTeamScore_${s.setId}`] = s.secondTeamScore || "";
  });

  return (
    <div className={showHideClassName}>
      <section className="popup-main max-w-[600px] w-full">
        <button onClick={handleClose} className="close-button text-3xl">
          &times;
        </button>
        <h1 className="text-3xl font-semibold">Match Result</h1>
        <Form form={form} initialValues={initialValues}>
          {set &&
            set.length > 0 &&
            set.map((s, index) => (
              <div key={index}>
                <div className="text-lg text-[#C6C61A] font-semibold my-[16px]">
                  Set {index + 1}
                </div>
                <div className="flex gap-8 justify-center">
                  <Form.Item
                    name={`firstTeamScore_${s.setId}`}
                    label={<b>{s.firstTeamName}</b>}
                    labelCol={{ span: 24 }}
                  >
                    <Input type="number" placeholder="Score" />
                  </Form.Item>
                  <Form.Item
                    name={`secondTeamScore_${s.setId}`}
                    label={<b>{s.secondTeamName}</b>}
                    labelCol={{ span: 24 }}
                  >
                    <Input type="number" placeholder="Score" />
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button
                    type="primary"
                    className="bg-[#C6C61A] px-8"
                    onClick={() => handleSave(s.setId)}
                  >
                    Save
                  </Button>
                </Form.Item>
              </div>
            ))}
        </Form>
      </section>
    </div>
  );
};

export default MatchResultRound;
