import { Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const News = () => {
  const [create, setCreate] = useState(false);
  const [form] = Form.useForm();
  const URL = "http://localhost:5000/api/newarticle";

  const onFinish = async (values) => {
    const data = {
      title: values.title,
      content: values.content,
      newsType: values.newsType,
    };

    try {
      const res = await axios.post(URL, data);
      if (res.status === 200) {
        toast.success("News posted successfully!");
        setCreate(false);
        form.resetFields(); // Clear form fields after successful submission
      }
    } catch (err) {
      toast.error("Failed to post news!");
    }
  };

  const handleClose = () => {
    setCreate(false);
  };

  return (
    <div>
      <h1 className="text-2xl text-[#033987] font-bold border-b border-[#C6C61A] mb-[32px] py-6">
        News Page
      </h1>
      <Button
        className="absolute top-12 right-6 border border-[#C6C61A] rounded-lg p-2 bg-[#C6C61A] text-white"
        type="primary"
        onClick={() => setCreate(true)}
      >
        Post News
      </Button>
      {create && (
        <Modal onCancel={handleClose} open={create} footer={null} width={1000}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label={<b>Title</b>}
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input title!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label={<b>News Type</b>}
              name="newsType"
              rules={[
                {
                  required: true,
                  message: "Please select type!",
                },
              ]}
            >
              <Select
                allowClear
                options={[
                  { value: "news", label: "News" },
                  { value: "gamePlay", label: "GamePlay" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<b>Content</b>}
              name="content"
              rules={[
                {
                  required: true,
                  message: "Please input content!",
                },
              ]}
            >
              <ReactQuill
                style={{ height: "150px" }} // Adjust height as needed
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "link",
                  "image",
                  "video",
                ]}
                onChange={(value) => form.setFieldsValue({ content: value })}
              />
            </Form.Item>
            <Form.Item>
              <div className="flex justify-end mt-8">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default News;
