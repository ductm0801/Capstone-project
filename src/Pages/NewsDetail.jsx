import { useLocation } from "react-router-dom";

const NewsDetail = () => {
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <div className="mt-[80px] flex flex-col items-center justify-center">
      <div
        className="flex flex-col justify-center items-center w-[100vw]"
        style={{
          backgroundImage: `url(${data.imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "500px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h1 className="text-[50px] font-bold uppercase py-3 text-white">
          {data.newsTitle}
        </h1>
        <div className=" bg-blue-500 text-white px-2 py-1 rounded-sm">
          {data.newsType === 1 ? "News" : "Game Play"}
        </div>
      </div>
      <div
        className="px-[200px] py-4 text-lg"
        dangerouslySetInnerHTML={{ __html: data.newsContent }}
      />
    </div>
  );
};
export default NewsDetail;
