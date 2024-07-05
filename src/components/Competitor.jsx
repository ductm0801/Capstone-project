import "../styles/competitor.css";
import defaultImg from "../images/competitor-img.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Competitor = () => {
  const [competitors, setCompetitor] = useState([]);
  const URL = "http://localhost:5000/api/athletes";
  const getUser = "http://localhost:5000/api/athletes/user-athletes";
  const getGuest = "http://localhost:5000/api/athletes/guest-athletes";
  const { id } = useParams();

  const getListCompetitor = async (id) => {
    try {
      const res = await axios.get(`${URL}?campaignId=${id}`);
      if (res.status === 200) {
        setCompetitor(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch competitors list.");
    }
  };

  const postListCompetitor = async (id) => {
    try {
      const res = await axios.post(`${getUser}?campaignId=${id}`);
      if (res.status === 200 || res.status === 201) {
        console.log("Successfully posted data:", res.data);
      } else {
        throw new Error("Unexpected status code: " + res.status);
      }
    } catch (error) {
      console.error("Failed to post data:", error);
      toast.error("Failed to post data.");
    }
  };

  const postListGuest = async (id) => {
    try {
      const res = await axios.post(`${getGuest}?campaignId=${id}`);
      if (res.status === 200 || res.status === 201) {
        console.log("Successfully posted data:", res.data);
      } else {
        throw new Error("Unexpected status code: " + res.status);
      }
    } catch (error) {
      console.error("Failed to post data:", error);
      toast.error("Failed to post data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        await postListCompetitor(id);
        await postListGuest(id);
        await getListCompetitor(id);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to fetch competitors data.");
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("Competitors state updated:", competitors);
  }, [competitors]);

  return (
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
  );
};

export default Competitor;
