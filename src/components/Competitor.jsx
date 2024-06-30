import "../styles/competitor.css";
import test from "../images/competitor-img.png";
import axios from "axios";
import { useEffect, useState } from "react";
const Competitor = () => {
  const [competitors, setCompetitor] = useState([]);
  const URL = "https://6538f1b3a543859d1bb23e2e.mockapi.io/User";

  const getListCompetitor = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
      setCompetitor(res.data);
    }
  };
  useEffect(() => {
    getListCompetitor();
  }, []);
  return (
    <div className="grid grid-cols-auto-fit sm:grid-cols-auto-fit md:grid-cols-auto-fit lg:grid-cols-auto-fit xl:grid-cols-auto-fit gap-8 justify-items-center justify-center pb-[120px]">
      {competitors &&
        competitors.map((competitor) => (
          <div className="gradient-bg">
            <img
              className="w-[360px] h-[480px]"
              src={competitor.avatar}
              alt={competitor.id}
            ></img>
            <div className="card-bg">
              <div className="name">{competitor.name}</div>
              <div className="textAndSupportingText">
                <div className="text">Rank: 4.0</div>
                <div className="supportingText">Male Player</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Competitor;
