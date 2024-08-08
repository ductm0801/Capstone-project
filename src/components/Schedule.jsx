import defaultImg from "../images/Avatar.png";

const Schedule = () => {
  return (
    <div className="bg-[#EFEFEF] pt-[48px] pb-[48px]">
      <h1 className="text-3xl font-semibold ml-[112px] mb-[48px]">
        Match Schedule
      </h1>
      <div className="flex flex-col gap-y-4">
        <div className="border relative h-[134px] bg-white mx-[216px] flex gap-4 items-center justify-center">
          <div className="absolute left-0 top-2">
            <div className="flex flex-col mx-[32px]">
              <div className="text-[48px] font-bold text-[#C6C61A]">13</div>
              <span className="text-[#1244A2] text-[16px] absolute top-3.5 left-[91px] font-bold">
                00
              </span>
              <div>Monday, 01/07</div>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <span className="text-xl flex items-center font-semibold">
              Team 1{" "}
              <img className="w-[90px] h-[90px]" src={defaultImg} alt="" />
            </span>
            <span className="text-[#C6C61A]">VS</span>
            <span className="text-xl flex items-center font-semibold">
              <img className="w-[90px] h-[90px]" src={defaultImg} alt="" />
              Team 2{" "}
            </span>
          </div>
        </div>
        <div className="border relative h-[134px] bg-white mx-[216px] flex gap-4 items-center justify-center">
          <div className="absolute left-0 top-2">
            <div className="flex flex-col mx-[32px]">
              <div className="text-[48px] font-bold text-[#C6C61A]">13</div>
              <span className="text-[#1244A2] text-[16px] absolute top-3.5 left-[91px] font-bold">
                00
              </span>
              <div>Monday, 01/07</div>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <span className="text-xl flex items-center font-semibold">
              Team 1{" "}
              <img className="w-[90px] h-[90px]" src={defaultImg} alt="" />
            </span>
            <span className="text-[#C6C61A]">VS</span>
            <span className="text-xl flex items-center font-semibold">
              <img className="w-[90px] h-[90px]" src={defaultImg} alt="" />
              Team 2{" "}
            </span>
          </div>
        </div>
        <div className="border relative h-[134px] bg-white mx-[216px] flex gap-4 items-center justify-center">
          <div className="absolute left-0 top-2">
            <div className="flex flex-col mx-[32px]">
              <div className="text-[48px] font-bold text-[#C6C61A]">13</div>
              <span className="text-[#1244A2] text-[16px] absolute top-3.5 left-[91px] font-bold">
                00
              </span>
              <div>Monday, 01/07</div>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <span className="text-xl flex items-center font-semibold">
              Team 1{" "}
              <img className="w-[90px] h-[90px]" src={defaultImg} alt="" />
            </span>
            <span className="text-[#C6C61A]">VS</span>
            <span className="text-xl flex items-center font-semibold">
              <img className="w-[90px] h-[90px]" src={defaultImg} alt="" />
              Team 2{" "}
            </span>
          </div>
        </div>
        <div className="border relative h-[134px] bg-white mx-[216px] flex gap-4 items-center justify-center">
          <div className="absolute left-0 top-2">
            <div className="flex flex-col mx-[32px]">
              <div className="text-[48px] font-bold text-[#C6C61A]">13</div>
              <span className="text-[#1244A2] text-[16px] absolute top-3.5 left-[91px] font-bold">
                00
              </span>
              <div>Monday, 01/07</div>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <span className="flex items-center text-xl font-semibold">
              Team 1
              <img className="w-[90px] h-[90px]" src={defaultImg} alt="" />
            </span>
            <span className="text-[#C6C61A]">VS</span>
            <span className="text-xl flex items-center font-semibold">
              <img className="w-[90px] h-[90px]" src={defaultImg} alt="" />
              Team 2{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Schedule;
