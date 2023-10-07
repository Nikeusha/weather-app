import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import umbrella from "../assets/icons/umbrella.png";
import wind from "../assets/icons/wind.png";
import humidity from "../assets/icons/humidity.png";
import arrowRight from "../assets/icons/arrow-right.png";
import { useGetWeatherQuery } from "../redux/weatherApi";
import Preloader from "../components/Preloader";
import { Link } from "react-router-dom";
import { getWeatherCondition } from "../utils/conditionIcons";
import HourBox from "../components/HourBox";
import Header from "../components/Header";

function Home() {
  const cityName = JSON.parse(sessionStorage.getItem("cityName"));
  const [city, setCity] = useState(cityName || "Tashkent");
  const [flickIndex, setFlickIndex] = useState(0);
  const [activeDay, setActiveDay] = useState("today");
  const {
    data: weather,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWeatherQuery(city);
  const [weatherInfo, setWeatherInfo] = useState({});
  let localtimeHour = weather?.location?.localtime.slice(-5, -3);
  let condition = getWeatherCondition(weatherInfo?.text);
  console.log(weather);

  const flickityOptions = {
    initialIndex: flickIndex,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
  };

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.setItem("cityName", JSON.stringify(weather.location.name));
      setWeatherInfo({
        temp_c: Math.round(weather.current.temp_c),
        wind: Math.round(weather.current.wind_kph),
        rain: Math.round(weather.current.vis_miles),
        humidity: Math.round(weather.current.humidity),
        text: weather.current.condition.text,
        date: new Date(weather.forecast.forecastday[0].date),
        hours: weather.forecast.forecastday[0].hour,
      });
    }
  }, [weather]);

  const getDate = () => {
    let date = weatherInfo?.date;
    let dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      date
    );
    let monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    let day = date?.getDate();

    return `${dayName}, ${monthName} ${day}`;
  };

  const showCurrent = () => {
    setActiveDay("today");
    setWeatherInfo({
      temp_c: Math.round(weather.current.temp_c),
      wind: Math.round(weather.current.wind_kph),
      rain: Math.round(weather.current.vis_miles),
      humidity: Math.round(weather.current.humidity),
      text: weather.current.condition.text,
      date: new Date(weather.forecast.forecastday[0].date),
      hours: weather.forecast.forecastday[0].hour,
    });
  };

  const showTomorrow = () => {
    let tomorrow = weather?.forecast?.forecastday[1];
    setActiveDay("tomorrow");
    setWeatherInfo({
      temp_c: Math.round(tomorrow.day.avgtemp_c),
      wind: Math.round(tomorrow.day.maxwind_kph),
      rain: Math.round(tomorrow.day.avgvis_miles),
      humidity: Math.round(tomorrow.day.avghumidity),
      text: tomorrow.day.condition.text,
      date: new Date(tomorrow.date),
      hours: tomorrow.hour,
    });
  };

  return (
    <main className="main overflow-hidden">
      <Header setCity={setCity} />
      {isLoading && <Preloader />}
      {isSuccess && (
        <section>
          <div className="w-full mt-[10px] sm:mt-0 py-[8px] px-[18px]">
            <h1 className="text-[30px] sm:text-[20px] font-medium text-[#313341] leading-[32px] sm:leading-[24.2px] w-[50%] sm:w-[130px]  ">
              {weather.location.country}, {weather.location.name}
            </h1>
            <h3 className="mt-[10px] font-normal sm:mt-[5px] text-[14px] sm:text-[9px] text-[#9a938c] ">
              {getDate()}
            </h3>
          </div>
          <div className="w-full mt-[15px] sm:mt-0 flex justify-around sm:justify-between items-center py-[4px] px-[30px]">
            <div className="w-[100px] h-[100px] sm:w-[88px] sm:h-[85px] ">
              <img
                className="w-full h-full"
                src={condition.icon}
                alt={condition.text}
              />
            </div>
            <div className="flex sm:basis-[50%]">
              <div className="flex flex-col items-center justify-center">
                <p className="text-[50px] leading-[57px] sm:text-[43px] sm:leading-[52.04px] font-bold text-[#303345] text-center ">
                  {weatherInfo?.temp_c}
                </p>
                <p className="text-[21px] sm:text-[14px] leading-[24px] sm:leading-[16.94px] text-center font-normal text-[#303345] ">
                  {condition.text}
                </p>
              </div>
              <div className="flex">
                <p className="text-[18px] font-light leading-[14.52px] text-[#303345] sm:text-[12px] ">
                  °
                </p>
                <p className="text-[18px] font-light leading-[14.52px] text-[#303345] sm:text-[12px]">
                  C
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-[15px] sm:mt-0 py-[15px] px-[16px] flex flex-col justify-center items-center">
            <div className="info-more-box w-full flex justify-between items-center rounded-[10px] py-[8px] px-[11px] mb-[10px] sm:mb-[5px] ">
              <div className="flex items-center gap-[8px]">
                <div className="w-[30px] h-[30px] sm:w-[22px] rounded-[8px] sm:h-[22px] bg-[#ffffffe5] rainfall-shadow">
                  <img
                    className="w-full h-full rainfall-icon-shadow"
                    src={umbrella}
                    alt="umbrella"
                  />
                </div>
                <p className="text-[12px] sm:text-[7px] font-normal leading-[8.47px] text-[#303345] ">
                  RainFall
                </p>
              </div>
              <div className="pr-[17px]">
                <p className="text-[12px] sm:text-[7px] font-normal leading-[8.47px] text-[#303345]">
                  {weatherInfo?.rain} cm
                </p>
              </div>
            </div>
            <div className="info-more-box w-full flex justify-between items-center rounded-[10px] py-[8px] px-[11px] mb-[10px] sm:mb-[5px] ">
              <div className="flex items-center gap-[8px]">
                <div className="w-[30px] h-[30px] sm:w-[22px] rounded-[8px] sm:h-[22px] bg-[#ffffffe5] wind-shadow">
                  <img
                    className="w-full h-full wind-icon-shadow"
                    src={wind}
                    alt="wind"
                  />
                </div>
                <p className="text-[12px] sm:text-[7px] font-normal leading-[8.47px] text-[#303345]">
                  Wind
                </p>
              </div>
              <div className="pr-[17px]">
                <p className="text-[12px] sm:text-[7px] font-normal leading-[8.47px] text-[#303345]">
                  {Math.round(weatherInfo?.wind)} km/h
                </p>
              </div>
            </div>
            <div className="info-more-box w-full flex justify-between items-center rounded-[10px] py-[8px] px-[11px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[30px] h-[30px] sm:w-[22px] rounded-[8px] sm:h-[22px] bg-[#ffffffe5] humidity-shadow">
                  <img
                    className="w-full h-full humidity-icon-shadow"
                    src={humidity}
                    alt="humidity"
                  />
                </div>
                <p className="text-[12px] sm:text-[7px] font-normal leading-[8.47px] text-[#303345]">
                  Humidity
                </p>
              </div>
              <div className="pr-[17px]">
                <p className="text-[12px] sm:text-[7px] font-normal leading-[8.47px] text-[#303345]">
                  {weatherInfo?.humidity} %
                </p>
              </div>
            </div>
          </div>
          <div className="tab mt-[15px] sm:mt-0 w-full px-[16px]">
            <div className="tab-titles flex justify-between items-center mb-[12px] sm:mb-[8px]">
              <div className="tab-titles-left flex items-center gap-[20px] sm:gap-[12px]">
                <button
                  onClick={() => showCurrent()}
                  className={
                    "text-[12px] sm:text-[8px] transition-all hover:text-[#313341] hover:font-bold leading-[9.68px] cursor-pointer " +
                    (activeDay === "today"
                      ? "font-bold text-[#313341]"
                      : "font-normal text-[#D6996B]")
                  }
                >
                  Today
                </button>
                <button
                  onClick={() => showTomorrow()}
                  className={
                    "text-[12px] sm:text-[8px] transition-all hover:text-[#313341] hover:font-bold leading-[9.68px] cursor-pointer " +
                    (activeDay === "tomorrow"
                      ? "font-bold text-[#313341]"
                      : "font-normal text-[#D6996B]")
                  }
                >
                  Tomorrow
                </button>
              </div>
              <Link
                to="/weekly"
                state={weather.forecast.forecastday}
                className="no-underline text-[#d6996b]"
              >
                <div className="tab-titles-right flex items-center gap-[20px] sm:gap-[12px] ">
                  <p className="text-[12px] sm:text-[8px] hover:text-[#313341] hover:font-bold transition-all leading-[9.68px] font-normal text-[#D6996B]">
                    Next 7 Days
                  </p>
                  <div className="w-[18px] h-[18px] flex justify-center items-center ">
                    <img
                      className=" w-[10px] h-[10px] sm:w-[6px] sm:h-[6px] "
                      src={arrowRight}
                      alt="rarrow-right"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div className="relative flex items-center pl-[8px] h-[2.5px] sm:h-[0.5px] bg-[#e2a272]">
              <div
                className={
                  " absolute w-[13px] h-[5px] sm:w-[10px] sm:h-[3px] rounded-[4px] bg-[#313341] " +
                  (activeDay === "tomorrow"
                    ? "left-[75px] sm:left-[50px]"
                    : "left-auto")
                }
              ></div>
            </div>
          </div>
          <div className="hourly mt-[15px] sm:mt-0">
            <Flickity options={flickityOptions}>
              {weatherInfo?.hours?.map((hour, index) => {
                return (
                  <HourBox
                    key={index}
                    hour={hour}
                    index={index}
                    localtime={localtimeHour}
                    changeIndex={setFlickIndex}
                  />
                );
              })}
            </Flickity>
          </div>
        </section>
      )}
      {isError && (
        <div className="absolute top-0 w-full h-full flex justify-center items-center">
          <div className="px-[20px]">
            <h1 className="text-center text-[20px] font-medium text-[#303345]">
              {error?.data?.error?.message}
            </h1>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
