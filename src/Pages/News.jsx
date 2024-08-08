import { useEffect, useState } from "react";
import bg from "../images/tDetail.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [filter, setFilter] = useState("All");
  const URL = "http://localhost:5000/api/newarticle";
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get(URL);
    if (res.status === 200) {
      setNews(res.data);
      setFilteredNews(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredNews(news);
    } else if (filter === "News") {
      setFilteredNews(news.filter((newz) => newz.newsType === 1));
    } else if (filter === "Game Play") {
      setFilteredNews(news.filter((newz) => newz.newsType === 0));
    }
  }, [filter, news]);

  const handleClick = (newz) => {
    console.log(`News clicked ${newz.id}`);
    navigate(`/news/${newz.id}`, {
      state: {
        data: newz,
      },
    });
  };

  return (
    <div className="overflow-x-hidden">
      <div
        className="mt-[80px] p-4 bg-cover no-repeat w-full"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="text-white text-3xl font-bold m-[64px]">News Page</h1>
        <div className="relative flex justify-center">
          <ul className="bg-white rounded-lg flex justify-evenly gap-8 p-2 mx-[112px] absolute border hidden md:flex">
            {["All", "News", "Game Play"].map((type) => (
              <li
                key={type}
                className={`px-20 rounded-lg text-xl text-white cursor-pointer ${
                  filter === type ? "bg-blue-700" : "bg-blue-500"
                }`}
                onClick={() => setFilter(type)}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-8 p-4 w-full mx-[112px] mb-[48px] mt-[64px]">
        {filteredNews.map((newz) => (
          <div
            onClick={() => handleClick(newz)}
            key={newz.id}
            className="flex gap-4 w-full p-4 cursor-pointer"
          >
            <img
              className="max-w-[342px] max-h-[171px]"
              src="https://via.placeholder.com/300x200"
              alt="news"
            />
            <div>
              <div className="border bg-[#EFF8FF] text-blue-500 mx-2 text-center rounded-lg w-[80px] font-semibold">
                {newz.newsType === 1 ? "News" : "Game Play"}
              </div>
              <h1 className="font-bold text-gray-600 text-[36px] mt-4 max-w-[800px]">
                {newz.newsTitle}
              </h1>
              <div className="text-[20px] text-[#344054] mt-4 max-w-[800px]">
                {newz.newsSubtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
