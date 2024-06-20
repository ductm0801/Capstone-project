import React, { useState } from "react";

import searchicon from "../images/Frame 4.png";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
const Tournament = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected, setSelected] = useState("Status");
  const [selected1, setSelected1] = useState("Last Update");
  const optionsStatus = [
    "Scheduled",
    "InProgress",
    "Completed",
    "Postponed",
    "Canceled",
    "WaitForResult",
  ];
  const optionsTime = ["Last Update", "Newest", "Oldest"];

  return (
    <div>
      <div
        style={{
          display: "flex",
          paddingTop: "44px",
          paddingLeft: "112px",
          paddingBottom: "24px",
          justifyContent: "space-between",
          paddingRight: "112px",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <input
            className="border-2 border-inherit rounded-lg w-[320px] h-[44px] p-4"
            type="text"
            placeholder="Search"
          ></input>{" "}
          <img src={searchicon} alt=""></img>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "16px",
          }}
        >
          <div className="flex flex-col items-center w-[137px] h-[44px] justify-between rounded-lg border-gray-300 border-2 text-base px-3">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex justify-between w-full items-center p-1"
            >
              {selected}
              {!isOpen ? (
                <FaChevronDown className="h-8 text-slate-500  " />
              ) : (
                <FaChevronUp className="h-8 text-slate-500  " />
              )}
            </button>
            {isOpen && (
              <div className="bg-white border-gray-300 border-2 absolute top-44 w-[137px] flex flex-col items-start rounded-lg p-2">
                {optionsStatus.map((option, i) => (
                  <div
                    onClick={(e) => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className="flex w-full justify-between border-inherit  border-b-2 p-3 cursor-pointer"
                    key={i}
                  >
                    <p className="">{option}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center w-[147px] h-[44px] justify-between rounded-lg border-gray-300 border-2 text-base px-3">
            <button
              onClick={() => setIsOpen1((prev) => !prev)}
              className="flex justify-between w-full items-center p-1"
            >
              {selected1}
              {!isOpen1 ? (
                <FaChevronDown className="h-8 text-slate-500  " />
              ) : (
                <FaChevronUp className="h-8 text-slate-500  " />
              )}
            </button>
            {isOpen1 && (
              <div className="bg-white border-gray-300 border-2 absolute top-44 w-[137px] flex flex-col items-start rounded-lg p-2 ">
                {optionsTime.map((option, i) => (
                  <div
                    onClick={(e) => {
                      setSelected1(option);
                      setIsOpen1(false);
                    }}
                    className="flex w-full justify-between border-inherit  border-b-2 p-3 cursor-pointer"
                    key={i}
                  >
                    <p className="">{option}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-slate-100 w-full h-[600px]"></div>
    </div>
  );
};
export default Tournament;
