import bg from "../images/tDetail.png";

const News = () => {
  return (
    <div className="overflow-x-hidden">
      <div
        className="mt-[80px] p-4 bg-cover no-repeat w-full"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="text-white text-3xl font-bold m-[64px]">News Page</h1>
        <div className="relative flex justify-center">
          <ul className="bg-white rounded-lg flex justify-evenly gap-8 p-2 mx-[112px] absolute border hidden md:flex">
            <li className="bg-blue-500 px-20 rounded-lg text-xl text-white">
              All
            </li>
            <li className="bg-blue-500 px-20 rounded-lg text-xl text-white">
              Type 1
            </li>
            <li className="bg-blue-500 px-20 rounded-lg text-xl text-white">
              Type 2
            </li>
            <li className="bg-blue-500 px-20 rounded-lg text-xl text-white">
              Type 3
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-8 p-4 w-full mx-[112px] mb-[48px] mt-[64px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex gap-4 w-full p-4">
            <img
              className="max-w-[342px] max-h-[171px]"
              src="https://via.placeholder.com/300x200"
              alt="news"
            />
            <div>
              <div className="border bg-[#EFF8FF] text-blue-500 mx-2 text-center rounded-lg w-[48px]">
                Type
              </div>
              <h1 className="font-bold text-gray-600 text-[36px] mt-4 max-w-[800px]">
                Những điều bạn chưa biết về năm 2023
              </h1>
              <div className="text-[20px] text-[#344054] mt-4 max-w-[800px]">
                How do you create compelling
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
