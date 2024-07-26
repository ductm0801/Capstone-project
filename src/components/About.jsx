import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { IoIosChatbubbles, IoMdSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const About = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const jwtToken = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    decodeToken();
  }, [jwtToken]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setUserRole(role);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, []);

  const decodeToken = () => {
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      setAccountId(decodedToken.UserId);
    }
  };

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
        commentData
      );
      if (response.status === 200) {
        console.log(commentData);
        setComment("");
      }
    } catch (error) {
      console.error("There was an error submitting the comment!", error);
      alert("Failed to submit comment");
    }
  };
  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/comments");
      setComments(response.data);
    } catch (error) {
      console.error("There was an error fetching the comments!", error);
    }
  };
  return (
    <div>
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
            <h1>comment</h1>
            <h1>comment</h1>
            <h1>comment</h1>
            <h1>comment</h1>
            <h1>comment</h1>
            <h1>comment</h1>
            <h1>comment</h1>
          </div>
        </div>
      </h1>
    </div>
  );
};

export default About;
