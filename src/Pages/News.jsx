import bg from "../images/tDetail.png";
const News = () => {
  return (
    <div>
      <div
        className="mt-[80px] p-4 bg-cover no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="text-white text-3xl font-bold m-[64px] ">News Page</h1>
        <div className="relative flex justify-center">
          <ul className="bg-white rounded-lg flex justify-evenly gap-8 p-2 mx-[112px] absolute border">
            <li className="bg-blue-500 px-24 rounded-lg text-2xl text-white">
              All
            </li>
            <li className="bg-blue-500 px-24 rounded-lg text-2xl text-white">
              1
            </li>
            <li className="bg-blue-500 px-24 rounded-lg text-2xl text-white">
              2
            </li>
            <li className="bg-blue-500 px-24 rounded-lg text-2xl text-white">
              3
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-4 w-full ml-[32px] mt-[64px]">
        <div className="w-[300px] h-[200px]  rounded-lg flex gap-4 w-full">
          <img src="https://via.placeholder.com/300x200" alt="news" />
          <div>
            <h1 className=" font-bold text-gray-600 mt-4 w-[800px]">
              Những điều bạn chưa biết về năm 2023
            </h1>
            <p className="text-sm text-[#344054] mt-4 w-[800px]">
              How do you create compeling
            </p>
          </div>
        </div>
        <div className="w-[300px] h-[200px]  rounded-lg flex gap-4">
          <img src="https://via.placeholder.com/300x200" alt="news" />
          <div>
            <h1 className="font-bold text-gray-600 mt-4 w-[800px]">
              Những điều bạn chưa biết về năm 2023
            </h1>
            <p className="text-sm text-gray-900 mt-4 w-[800px]">
              How do you create compeling
            </p>
          </div>
        </div>
        <div className="w-[300px] h-[200px] bg-gray-200 rounded-lg flex gap-4">
          <img src="https://via.placeholder.com/300x200" alt="news" />
          <div>
            <h1 className=" font-bold text-gray-600 mt-4 w-[800px]">
              Những điều bạn chưa biết về năm 2023
            </h1>
            <p className="text-sm text-gray-900 mt-4 w-[800px]">
              How do you create compeling
            </p>
          </div>
        </div>
        <div className="w-[300px] h-[200px] bg-gray-200 rounded-lg flex gap-4">
          <img src="https://via.placeholder.com/300x200" alt="news" />
          <div>
            <h1 className=" font-bold text-gray-600 mt-4 w-[800px]">
              Những điều bạn chưa biết về năm 2023
            </h1>
            <p className="text-sm text-gray-900 mt-4 w-[800px]">
              How do you create compeling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default News;
