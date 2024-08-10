import { useEffect, useState } from "react";
import defaultImg from "../images/Avatar.png";

import "../App.css";
import tourch from "../images/torch.png";

const Schedule = ({ id }) => {
  const [match, setMatch] = useState([]);

  const URL =
    "https://pickleball-agdwcrbacmaea5fg.eastus-01.azurewebsites.net/api/pickleball-match";

  const fetchData = async () => {
    const res = await fetch(`${URL}/${id}`);
    const data = await res.json();
    setMatch(data);
  };
  console.log(id);

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="bg-[#EFEFEF] pt-[48px] pb-[48px]">
      <h1 className="text-3xl font-semibold ml-[112px] mb-[48px]">
        Match Schedule
      </h1>
      <div className="flex flex-col gap-8">
        {match &&
          match.length > 0 &&
          match.map((item, index) => (
            <div key={index}>
              <div className="flex justify-center items-center flex-col">
                <img className="w-[60px] h-[60px]" src={tourch} alt="" />
                <div className="trapezium-container">
                  <span className="trapezium-text text-3xl font-semibold">
                    Round: {item.roundOrder}
                  </span>
                </div>
              </div>
              <div className="border relative h-[134px] bg-white mx-[500px] flex gap-4 items-center justify-center">
                <div className="absolute left-0 top-2">
                  <div className="flex flex-col mx-[32px]">
                    <div className="text-[48px] font-bold text-[#C6C61A]">
                      13
                    </div>
                    <span className="text-[#1244A2] text-[16px] absolute top-3.5 left-[91px] font-bold">
                      00
                    </span>
                    <div>Monday, 01/07</div>
                  </div>
                </div>
                <div className="flex gap-4 items-center justify-center">
                  <span className="text-xl flex items-center font-semibold">
                    {item.firstTeam || "Team 1"}
                  </span>
                  <span className="text-[#C6C61A] text-lg">VS</span>
                  <span className="text-xl flex items-center font-semibold">
                    {item.secondTeam || "Team 2"}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Schedule;
