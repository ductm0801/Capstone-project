import "../styles/competitor.css";
import defaultImg from "../images/competitor-img.png";
import femaleImg from "../images/defaultFemale.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Empty, Pagination } from "antd";
import ListRegistration from "./ListRegistration";
import ListAthlete from "./ListAthlete";

const Competitor = () => {
  const [competitors, setCompetitor] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const URL = "https://nhub.site/api/athletes/campaign/paging";
  const jwtToken = localStorage.getItem("token");

  const { id } = useParams();
  const role = localStorage.getItem("role");
  console.log(id);

  const getListCompetitor = async () => {
    try {
      const res = await axios.get(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          pageIndex: pageIndex - 1 || 0,
          pageSize,
        },
      });

      if (res.status === 200) {
        setCompetitor(res.data.items);
        setTotalItemsCount(res.data.totalItemsCount);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getListCompetitor(id, pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  // Handler for page change
  const handlePageChange = (page, pageSize) => {
    setPageIndex(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      {role === "Manager" && (
        <div className="flex gap-4">
          <button
            className="bg-[#1244a2] rounded-lg px-2 py-4 m-4 text-white"
            onClick={() => setOpenPopup(true)}
          >
            Get List Guest Regist
          </button>
          <button
            className="bg-[#1244a2] rounded-lg px-2 py-4 m-4 text-white"
            onClick={() => setOpenPopup2(true)}
          >
            Get List Athlete
          </button>
        </div>
      )}
      <div className="grid grid-cols-auto-fit sm:grid-cols-auto-fit md:grid-cols-auto-fit lg:grid-cols-auto-fit xl:grid-cols-auto-fit gap-8 justify-items-center justify-center pb-[120px]">
        {competitors && competitors.length > 0 ? (
          competitors.map((competitor) => (
            <div className="gradient-bg" key={competitor.id}>
              <img
                className="w-[360px] h-[480px]"
                src={
                  competitor.avatar
                    ? competitor.avatar
                    : competitor.gender === "Male"
                    ? defaultImg
                    : femaleImg
                }
                alt={competitor.id}
              />
              <div className="card-bg">
                <div className="name">{competitor.athleteName}</div>
                <div className="textAndSupportingText">
                  <div className="text">{competitor.rank || "unknown"}</div>
                  <div className="supportingText">
                    {competitor.gender || "unknown"} ( {competitor.athleteType})
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>

      <div className="flex w-full justify-center">
        <Pagination
          current={pageIndex}
          pageSize={pageSize}
          total={totalItemsCount}
          showSizeChanger
          onChange={handlePageChange}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>

      {openPopup && (
        <ListRegistration
          openPopup={openPopup}
          handleClose={() => setOpenPopup(false)}
          campaignId={id}
          onSave={getListCompetitor}
        />
      )}
      {openPopup2 && (
        <ListAthlete
          openPopup={openPopup2}
          handleClose={() => setOpenPopup2(false)}
          campaignId={id}
          onSave={getListCompetitor}
        />
      )}
    </div>
  );
};

export default Competitor;
