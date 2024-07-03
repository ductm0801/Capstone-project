import "../styles/competitor.css";
import test from "../images/competitor-img.png";
import defaultImg from "../images/competitor-img.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Competitor = () => {
  const [competitors, setCompetitor] = useState([]);
  const URL = "http://localhost:5000/api/athletes";
  const URL2 = "http://localhost:5000/api/athletes/user-athletes";
  const URL3 = "http://localhost:5000/api/athletes/guest-athletes";
  const { id } = useParams();

  const getListCompetitor = async (id) => {
    const res = await axios.get(`${URL}?tournamentId=${id}`);
    if (res.status === 200) {
      setCompetitor(res.data);
    }
  };
  const postListCompetitor = async (id) => {
    try {
      const res = await axios.post(`${URL2}?tournamentId=${id}`);
      if (res.status === 200 || res.status === 201) {
      }
    } catch (error) {
      toast.error("fail to get list altheles");
    }
  };
  const postListGuest = async (id) => {
    try {
      const res = await axios.post(`${URL3}?tournamentId=${id}`);
      if (res.status === 200 || res.status === 201) {
      }
    } catch (error) {
      toast.error("fail to get list guest");
    }
  };
  useEffect(() => {
    getListCompetitor(id);
    postListCompetitor(id);
    postListGuest(id);
  }, [id]);
  return (
    <div className="grid grid-cols-auto-fit sm:grid-cols-auto-fit md:grid-cols-auto-fit lg:grid-cols-auto-fit xl:grid-cols-auto-fit gap-8 justify-items-center justify-center pb-[120px]">
      {competitors &&
        competitors.map((competitor) => (
          <div className="gradient-bg">
            <img
              className="w-[360px] h-[480px]"
              src={competitor.avatar ? competitor.avatar : defaultImg}
              alt={competitor.id}
            ></img>
            <div className="card-bg">
              <div className="name">{competitor.participantName}</div>
              <div className="textAndSupportingText">
                <div className="text">{competitor.rank || "unknown"}</div>
                <div className="supportingText">
                  {competitor.gerder || "unknown"}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Competitor;
