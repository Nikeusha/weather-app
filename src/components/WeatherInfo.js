import React, { useEffect, useRef, useState } from "react";
import Flickity from "react-flickity-component";
import searchIcon from "../assets/icons/search-icon.png";
import point from "../assets/icons/point.png";
import navIcon from "../assets/icons/nav-icon.png";
import cloudy from "../assets/images/cludy.png";
import sun from "../assets/icons/sun.png";
import umbrella from "../assets/icons/umbrella.png";
import wind from "../assets/icons/wind.png";
import humidity from "../assets/icons/humidity.png";
import arrowRight from "../assets/icons/arrow-right.png";
import { useGetWeatherQuery } from "../redux/weatherApi";
import Preloader from "../components/Preloader";
import { Link } from "react-router-dom";
import { conditions } from "../utils/conditionIcons";
import Turnstone from "turnstone";

function WeatherInfo() {
  return (
    <>
      <div className="info">
        <div className="info-condition">
          <img src={conditions[weatherInfo?.text] || cloudy} alt="condition" />
        </div>
        <div className="info-degree">
          <div className="degree">
            <p>{weatherInfo?.temp_c}</p>
            <p>Rainy</p>
          </div>
          <div className="degree-sign">
            <p>°</p>
            <p>C</p>
          </div>
        </div>
      </div>
      <div className="info-more">
        <div className="info-more-box">
          <div className="left">
            <div className="info-more-icon rainfall-shadow">
              <img
                className="rainfall-icon-shadow"
                src={umbrella}
                alt="umbrella"
              />
            </div>
            <p>RainFall</p>
          </div>
          <div className="right">
            <p>{weatherInfo?.rain}cm</p>
          </div>
        </div>
        <div className="info-more-box">
          <div className="left">
            <div className="info-more-icon wind-shadow">
              <img className="wind-icon-shadow" src={wind} alt="wind" />
            </div>
            <p>Wind</p>
          </div>
          <div className="right">
            <p>{Math.round(weatherInfo?.wind)}km/h</p>
          </div>
        </div>
        <div className="info-more-box">
          <div className="left">
            <div className="info-more-icon humidity-shadow">
              <img
                className="humidity-icon-shadow"
                src={humidity}
                alt="humidity"
              />
            </div>
            <p>Humidity</p>
          </div>
          <div className="right">
            <p>{weatherInfo?.humidity}%</p>
          </div>
        </div>
      </div>
      <div className="tab">
        <div className="tab-titles">
          <div className="tab-titles-left">
            <p onClick={() => showCurrent()} className="today cursor-pointer">
              Today
            </p>
            <p onClick={() => showTomorrow()} className="cursor-pointer">
              Tomorrow
            </p>
          </div>
          <Link
            to="/weekly"
            state={weather.forecast.forecastday}
            className="no-underline text-[#d6996b]"
          >
            <div className="tab-titles-right">
              <p>Next 7 Days</p>
              <div className="arrow-right-icon">
                <img src={arrowRight} alt="rarrow-right" />
              </div>
            </div>
          </Link>
        </div>
        <div className="seperate">
          <div></div>
        </div>
      </div>
      <div className="hourly">
        <Flickity options={flickityOptions}>
          {weatherInfo?.hours?.map((hour, index) => {
            return (
              <div
                key={index}
                className="hourly-box flex flex-col items-center justify-center gap-[3px] "
              >
                <p className="hour">{hour.time.slice(-5)}</p>
                <div className="hourly-condition">
                  <img src={conditions[hour.condition.text]} alt="sun" />
                </div>
                <p className="hourly-degree">{Math.round(hour.temp_c)} °</p>
              </div>
            );
          })}
        </Flickity>
      </div>
    </>
  );
}

export default WeatherInfo;
