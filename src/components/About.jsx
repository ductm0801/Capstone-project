import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { IoIosChatbubbles, IoMdSend } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegTrashAlt, FaRegEyeSlash } from "react-icons/fa";
import { PiDotsThreeCircleVertical } from "react-icons/pi";
import { BiSolidPencil } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { Button, Dropdown, message, Modal, Input } from "antd";
import defaultImg from "../images/commentDefault.png";
import MapComponent from "./Map";

const items = (handleEditClick, handleDeleteClick) => [
  {
    key: 1,
    label: (
      <div className="flex items-center gap-2" onClick={handleEditClick}>
        <span>Edit</span>
        <BiSolidPencil />
      </div>
    ),
  },
  {
    key: 2,
    label: (
      <div className="flex items-center gap-2" onClick={handleDeleteClick}>
        <span>Delete</span>
        <FaRegTrashAlt />
      </div>
    ),
  },
];

const About = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const jwtToken = localStorage.getItem("token");
  const { id } = useParams();

  function getRelativeTime(dateString) {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEditCommentChange = (e) => {
    setEditCommentText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  useEffect(() => {
    try {
      if (jwtToken) {
        const decoded = jwtDecode(jwtToken);
        const role = decoded.Role;
        setUserRole(role);
        setAccountId(decoded.UserId);
      }
    } catch (error) {
      message.error(
        "Failed to decode token: " + (error.response?.data || error.message)
      );
    }
  }, [jwtToken]);

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    if (!accountId) {
      toast.info("Need Login to comment");
      return;
    }

    const commentData = {
      commentText: comment,
      tournamentId: id,
      accountId: accountId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/comment",
        commentData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(commentData);
        setComment("");
        await fetchComments();
      }
    } catch (error) {
      message.error(error.response?.data || "Failed to submit comment");
    }
  };

  const handleEditCommentSubmit = async () => {
    if (editCommentText.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/comment/${editCommentId}`,
        { commentText: editCommentText },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Comment updated successfully");
        setEditCommentId(null);
        setEditCommentText("");
        await fetchComments();
      }
    } catch (error) {
      message.error(error.response?.data || "Failed to update comment");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comment/tournament/${id}`
      );
      setComments(response.data);
    } catch (error) {
      // message.error(error.response?.data || "Failed to fetch comments");
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/comment/permanent/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Comment deleted successfully");
        await fetchComments();
      }
    } catch (error) {
      message.error(error.response?.data || "Failed to delete comment");
    }
  };

  const handleDeleteClick = (comment) => {
    setCommentToDelete(comment);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (commentToDelete) {
      deleteComment(commentToDelete.id);
      setCommentToDelete(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCommentToDelete(null);
  };

  const handleEditClick = (comment) => {
    setEditCommentId(comment.id);
    setEditCommentText(comment.commentText);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-end justify-center mr-[64px] mt-[32px]">
        <h1 className="flex items-center gap-2 text-4xl text-[#C6C61A] mb-[24px]">
          Address
        </h1>
        <div className="w-[500px] h-[300px] mb-12">
          <MapComponent
            lat={10.811953}
            lng={106.627433}
            address="130 Chế Lan Viên, Tây thạnh, Tân phú"
          />
        </div>
      </div>
      <h1>
        <div className="flex flex-col mx-[112px] mt-[52px]">
          <h1 className="flex items-center gap-2 text-3xl text-[#C6C61A] mb-[24px]">
            <span>
              <IoIosChatbubbles className="text-blue-900" />
            </span>
            Comments
          </h1>
          <div className="relative w-full">
            <textarea
              type="text"
              value={comment}
              onChange={handleCommentChange}
              onKeyDown={handleKeyDown}
              placeholder="Write your comment"
              className="mb-[24px] w-full p-4 border rounded-lg"
              style={{ height: "100px", resize: "none" }}
            />
            <IoMdSend
              className="absolute right-3 top-[80px] text-xl transform -translate-y-1/2 cursor-pointer text-blue-900"
              onClick={handleCommentSubmit}
            />
          </div>

          <div>
            {comments.length > 0 &&
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex flex-col gap-y-2 mb-[16px]"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <img src={defaultImg} alt="" />
                      <span className="text-[#1244A2] text-[16px] font-semibold ">
                        {comment.fullName}
                      </span>
                      <span className="text-[12px] text-[#667085]">
                        {getRelativeTime(comment.createDate)}
                      </span>
                      {/* <span onClick={() => handleDeleteClick(comment)}>
                        {userRole === "Manager" &&
                        comment.isDeleted === false ? (
                          <IoEyeSharp />
                        ) : (
                          <FaRegEyeSlash />
                        )}
                      </span> */}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center border rounded-lg px-4 py-4">
                      {editCommentId === comment.id ? (
                        <Input
                          value={editCommentText}
                          onChange={handleEditCommentChange}
                          onPressEnter={handleEditCommentSubmit}
                        />
                      ) : (
                        comment.commentText
                      )}
                      <div>
                        {comment.userId == accountId && (
                          <Dropdown
                            menu={{
                              items: items(
                                () => handleEditClick(comment),
                                () => handleDeleteClick(comment)
                              ),
                            }}
                            placement="bottomRight"
                            trigger={"click"}
                          >
                            <PiDotsThreeCircleVertical className="text-2xl" />
                          </Dropdown>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </h1>

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this comment?</p>
      </Modal>
    </div>
  );
};

export default About;
