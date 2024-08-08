import { useLocation } from "react-router-dom";

const NewsDetail = () => {
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <div className="mt-[80px] flex flex-col items-center justify-center">
      <div className=" bg-blue-500 text-white px-2 py-1 rounded-sm">
        {data.newsType === 1 ? "News" : "Game Play"}
      </div>
      <h1 className="text-3xl py-3">{data.newsTitle}</h1>
      <div
        className="px-[200px] py-4"
        dangerouslySetInnerHTML={{ __html: data.newsContent }}
      />
    </div>
  );
};
export default NewsDetail;
