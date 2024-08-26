import "../styles/competitor.css";
import defaultImg from "../images/competitor-img.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { message } from "antd";
import ListRegistration from "./ListRegistration";

const Competitor = () => {
  const [competitors, setCompetitor] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const URL = "http://localhost:5000/api/athletes/campaign";
  const jwtToken = localStorage.getItem("token");

  const { id } = useParams();
  const role = localStorage.getItem("role");
  const getListCompetitor = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res.status === 200) {
        setCompetitor(res.data);
      }
    } catch (error) {
      // const errorMessage = error.response?.data?.message || "An error occurred";
      // message.error(errorMessage);
    }
  };

  useEffect(() => {
    getListCompetitor(id);
  }, []);

  // const postListCompetitor = async (id) => {
  //   try {
  //     const res = await axios.post(`${getUser}?campaignId=${id}`);
  //     if (res.status === 200 || res.status === 201) {
  //       console.log("Successfully posted data:", res.data);
  //     } else if (res.status === 400) {
  //       toast.info("there no new athelete");
  //     }
  //   } catch (error) {
  //     message.error(error.response.data);
  //   }
  // };

  // const postListGuest = async (id) => {
  //   try {
  //     const res = await axios.post(`${getGuest}?campaignId=${id}`);
  //     if (res.status === 200 || res.status === 201) {
  //       console.log("Successfully posted data:", res.data);
  //     } else if (res.status === 400) {
  //       toast.info("there no new athelete");
  //     }
  //   } catch (error) {
  //     message.error(error.response.data);
  //   }
  // };

  // const getListParticipants = () => {
  //   postListCompetitor(id);
  //   postListGuest(id);
  //   getListCompetitor(id);
  // };

  // useEffect(() => {
  //   getListCompetitor(id);
  // }, []);
  // useEffect(() => {
  //   postListCompetitor(id);
  //   postListGuest(id);
  // }, [id]);

  return (
    <div>
      {role === "Manager" && (
        <button
          className="bg-[#1244a2] rounded-lg px-2 py-4 m-4 text-white"
          onClick={() => setOpenPopup(true)}
        >
          Get List participant
        </button>
      )}
      <div className="grid grid-cols-auto-fit sm:grid-cols-auto-fit md:grid-cols-auto-fit lg:grid-cols-auto-fit xl:grid-cols-auto-fit gap-8 justify-items-center justify-center pb-[120px]">
        {competitors &&
          competitors.map((competitor) => (
            <div className="gradient-bg" key={competitor.id}>
              <img
                className="w-[360px] h-[480px]"
                src={competitor.avatar ? competitor.avatar : defaultImg}
                alt={competitor.id}
              />
              <div className="card-bg">
                <div className="name">{competitor.athleteName}</div>
                <div className="textAndSupportingText">
                  <div className="text">{competitor.rank || "unknown"}</div>
                  <div className="supportingText">
                    {competitor.gender || "unknown"}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {openPopup && (
        <ListRegistration
          openPopup={openPopup}
          handleClose={() => setOpenPopup(false)}
          competitors={competitors}
        />
      )}
    </div>
  );
};

export default Competitor;
