import { Button, Form, Input, message, Modal, Select, Upload } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const News = () => {
  const [create, setCreate] = useState(false);
  const [news, setNews] = useState([]);
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();
  const detail = useRef({});
  const [imageUrl, setImageUrl] = useState("");
  const URL = "http://localhost:5000/api/newarticle";
  const uploadURL = "http://localhost:5000/api/image/upload";

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      if (res.status === 200) {
        setNews(res.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.data) {
      message.error(error.response.data.title || "An error occurred");
    } else {
      message.error("An error occurred");
    }
  };

  const onFinish = async (values) => {
    const data = {
      newsTitle: values.newsTitle,
      newsContent: values.newsContent,
      newsType: parseInt(values.newsType),
      newsArticleStatus: true,
      imageUrl, // Include image URL if available
    };

    try {
      const res = await axios.post(URL, data);
      if (res.status === 201) {
        toast.success("News posted successfully!");
        setCreate(false);
        form.resetFields();
        fetchData();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const onFinishEdit = async (values) => {
    const data = {
      newsTitle: values.newsTitle,
      newsContent: values.newsContent,
      newsType: parseInt(values.newsType),
      newsArticleStatus: true,
      imageUrl, // Include image URL if available
    };
    try {
      const res = await axios.put(`${URL}/${detail.current.id}`, data);
      if (res.status === 204) {
        toast.success("News edited successfully!");
        setEdit(false);
        form.resetFields();
        fetchData();
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setCreate(false);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };
  const handleEdit = (item) => {
    setEdit(true);
    detail.current = item;
    setImageUrl(item.imageUrl || "");
  };
  const handleDelete = async (item) => {
    try {
      const res = await axios.delete(`${URL}/${item.id}`);
      if (res.status === 204) {
        toast.success("News deleted successfully!");
        fetchData();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const showDeleteConfirm = (item) => {
    Modal.confirm({
      title: "Are you sure you want to delete this news?",
      icon: <FaRegTrashAlt />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(item),
    });
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(uploadURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        setImageUrl(res.data.url);
        return res.data.url;
      }
    } catch (error) {
      handleError(error);
    }
    return null;
  };

  const uploadButton = <Button>Upload</Button>;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <div key={index}>
            <div className="p-6 flex items-center justify-between cursor-pointer border border-[#C6C61A] rounded-lg">
              <h2 onClick={() => handleEdit(item)}>{item.newsTitle}</h2>
              <div
                className="bg-red-500 rounded-lg p-2 text-white"
                onClick={() => showDeleteConfirm(item)}
              >
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
        ))}
      </div>
      {create && (
        <Modal onCancel={handleClose} open={create} footer={null} width={1000}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label={<b>Image</b>} name="imageUrl">
              <Upload
                customRequest={({ file, onSuccess }) => {
                  uploadImage(file).then((url) => {
                    onSuccess(url);
                  });
                }}
                listType="picture-card"
                maxCount={1}
              >
                {imageUrl ? (
                  <div>
                    {" "}
                    <PlusOutlined />
                    Change Image
                  </div>
                ) : (
                  <div>
                    <PlusOutlined /> Upload
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label={<b>Title</b>}
              name="newsTitle"
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
                  { value: "1", label: "News" },
                  { value: "0", label: "GamePlay" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={<b>Content</b>}
              name="newsContent"
              rules={[
                {
                  required: true,
                  message: "Please input content!",
                },
              ]}
            >
              <ReactQuill
                style={{ height: "150px" }}
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
                onChange={(value) =>
                  form.setFieldsValue({ newsContent: value })
                }
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
      {edit && (
        <Modal
          onCancel={handleCloseEdit}
          open={edit}
          footer={null}
          width={1000}
        >
          <Form
            form={form}
            onFinish={onFinishEdit}
            initialValues={{ ...detail.current }}
            layout="vertical"
          >
            <Form.Item label={<b>Image</b>} name="imageUrl">
              <Upload
                customRequest={({ file, onSuccess }) => {
                  uploadImage(file).then((url) => {
                    onSuccess(url);
                  });
                }}
                showUploadList={false}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100px" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label={<b>Title</b>}
              name="newsTitle"
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
                  { value: "1", label: "News" },
                  { value: "0", label: "GamePlay" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={<b>Content</b>}
              name="newsContent"
              rules={[
                {
                  required: true,
                  message: "Please input content!",
                },
              ]}
            >
              <ReactQuill
                style={{ height: "150px" }}
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
                onChange={(value) =>
                  form.setFieldsValue({ newsContent: value })
                }
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
