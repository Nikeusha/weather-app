import React from "react";
import sun from "../assets/icons/sun.png";

function NextDayBox() {
  return (
    <div className="weekly-day p-[12px] sm:py-[8px] sm:px-[11px] rounded-[10px] flex justify-between items-center ">
      <p className="font-semibold text-[14px] sm:text-[7px] leading-[8.47px] text-[#303345]">
        Thursday
      </p>
      <div className="flex items-center gap-[5px]">
        <p className="font-bold text-[14px] sm:text-[7px] text-center leading-[8.47px] text-[#303345]">
          22 °
        </p>
        <div className="w-[40px] h-[40px] sm:w-[24px] sm:h-[24px] ">
          <img className="w-full h-full" src={sun} alt="condition" />
        </div>
      </div>
    </div>
  );
}

export default NextDayBox;
