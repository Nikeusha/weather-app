import React, { useEffect } from "react";
import { getWeatherCondition } from "../utils/conditionIcons";

function HourBox({ hour, localtime, changeIndex, index }) {
  let formattedHour = localtime[0] === " " ? `0${localtime[1]}` : localtime;
  let isEqual = formattedHour === hour.time.slice(-5, -3);
  let condition = getWeatherCondition(hour.condition.text)

  useEffect(() => {
    if (isEqual) {
      changeIndex(index);
    }
  }, []);
  return (
    <div
      className={
        "py-[12px] px-[8px] mr-[10px] sm:py-[8px] sm:px-[4px] rounded-[20px] flex flex-col items-center justify-center gap-[8px] sm:gap-[3px] " +
        (isEqual ? "hourly-box-active" : "bg-[#ffffff4d]")
      }
    >
      <p className={"text-[12px] sm:text-[7px] font-normal leading-[8.47px] text-center " + (isEqual ? "text-[#303345]" : "text-[#9c9eaa]")}>
        {isEqual ? "now" : hour.time.slice(-5)}
      </p>
      <div className="">
        <img className="w-[30px] h-[30px] sm:w-[24px] sm:h-[24px] " src={condition.icon} alt="condition" />
      </div>
      <p className="text-[12px] sm:text-[7px] font-bold leading-[8.47px] text-center text-[#303345]">{Math.round(hour.temp_c)} °</p>
    </div>
  );
}

export default HourBox;
