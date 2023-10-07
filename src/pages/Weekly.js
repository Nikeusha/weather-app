import React from "react";
import arrowLeft from "../assets/icons/arrow-left.png";
import umbrella from "../assets/icons/umbrella.png";
import wind from "../assets/icons/wind.png";
import humidity from "../assets/icons/humidity.png";
import { getWeatherCondition } from "../utils/conditionIcons";
import { useLocation, useNavigate } from "react-router-dom";
import NextDayBox from "../components/NextDayBox";

function Weekly() {
  const navigate = useNavigate();
  const days = useLocation().state;
  const [, tomorrow, ...restDays] = days;

  const getDayName = (d) => {
    let date = new Date(d);
    let dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      date
    );
    return dayName;
  };

  return (
    <main className="weekly">
      <section>
        <div className="flex justify-between mt-[15px] sm:mt-0 items-center p-[20px] sm:py-[12px] sm:p-[11px]">
          <button
            onClick={() => navigate(-1)}
            className="w-[24px] h-[24px] flex justify-center items-center "
          >
            <img
              className="w-full h-full sm:w-[14px] sm:h-[14px]"
              src={arrowLeft}
              alt="arrow-left"
            />
          </button>
          <h2 className="text-[20px] font-medium sm:font-normal sm:text-[11px] leading-[13.41px] text-[#313341] ">
            Next 7 Days
          </h2>
          <div className="w-[24px] h-[24px] "></div>
        </div>
        <div className="mt-[20px] sm:mt-0 py-[15px] px-[20px] sm:px-[16px] ">
          <div className="weekly-day day-active p-[12px] sm:py-[8px] sm:px-[11px] rounded-[10px] ">
            <div>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[14px] sm:text-[7px] leading-[8.47px] text-[#303345] ">
                  Tomorrow
                </p>
                <div className="flex items-center gap-[5px]">
                  <p className="font-bold text-[14px] sm:text-[7px] text-center leading-[8.47px] text-[#303345]">
                    {Math.round(tomorrow.day.avgtemp_c)} °
                  </p>
                  <div className="w-[50px] h-[50px] sm:w-[32px] sm:h-[32px] ">
                    <img
                      className="w-full h-full"
                      src={
                        getWeatherCondition(tomorrow.day.condition.text).icon
                      }
                      alt={
                        getWeatherCondition(tomorrow.day.condition.text).text
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between items-center py-[11px] px-[28px] ">
              <div className="flex flex-col items-center ">
                <div className="rainfall-shadow w-[40px] h-[40px] sm:w-[22px] sm:h-[22px] rounded-[8px] bg-[#ffffffe5] ">
                  <img
                    className="w-full h-full sm:w-auto sm:h-auto "
                    src={umbrella}
                    alt="umbrella"
                  />
                </div>
                <p className="text-[14px] mt-[15px] sm:mt-[10px] font-semibold text-center sm:text-[7px] leading-[8.47px] text-[#303345]">
                  {tomorrow.day.avgvis_miles} cm
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="wind-shadow w-[40px] h-[40px] sm:w-[22px] sm:h-[22px] rounded-[8px] bg-[#ffffffe5] ">
                  <img className="w-full h-full" src={wind} alt="wind" />
                </div>
                <p className="text-[14px] mt-[15px] sm:mt-[10px] font-semibold text-center sm:text-[7px] leading-[8.47px] text-[#303345]">
                  {Math.round(tomorrow.day.maxwind_kph)} km/h
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="humidity-shadow w-[40px] h-[40px] sm:w-[22px] sm:h-[22px] rounded-[8px] bg-[#ffffffe5] ">
                  <img
                    className="w-full h-full sm:w-auto sm:h-auto "
                    src={humidity}
                    alt="humidity"
                  />
                </div>
                <p className="text-[14px] mt-[15px] sm:mt-[10px] font-semibold text-center sm:text-[7px] leading-[8.47px] text-[#303345]">
                  {Math.round(tomorrow.day.avghumidity)} %
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[15px] sm:gap-[5px] mt-[25px] sm:mt-[16px] ">
            {restDays.map((nextDay, index) => {
              return (
                <div
                  key={index}
                  className="weekly-day p-[12px] sm:py-[8px] sm:px-[11px] rounded-[10px] flex justify-between items-center "
                >
                  <p className="font-semibold text-[14px] sm:text-[7px] leading-[8.47px] text-[#303345]">
                    {getDayName(nextDay.date)}
                  </p>
                  <div className="flex items-center gap-[5px]">
                    <p className="font-bold text-[14px] sm:text-[7px] text-center leading-[8.47px] text-[#303345]">
                      {Math.round(nextDay.day.avgtemp_c)} °
                    </p>
                    <div className="w-[40px] h-[40px] sm:w-[24px] sm:h-[24px] ">
                      <img
                        className="w-full h-full"
                        src={
                          getWeatherCondition(nextDay.day.condition.text).icon
                        }
                        alt={
                          getWeatherCondition(nextDay.day.condition.text).text
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            {[1, 2, 3, 4, 5].map((day) => (
              <NextDayBox key={day} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Weekly;
