"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";
const API_KEY = import.meta.env.VITE_API_BASE_URL;

function GetWeatherApi() {
  const [weatherData, setWeatherData] = useState("");
  const [loading, setLoading] = useState(true);
  const [isError, setError] = useState(null);
  const [inputValue, setInputValue] = useState("Nepal");

  const fetchData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=yes`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError("Location not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(inputValue);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;
    fetchData(inputValue);
  };

  console.log(weatherData);
  return (
    <>
      <h1 className="font-bold text-3xl! md:text-4xl text-white mb-5">
        Weather Report
      </h1>

      <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center mx-auto weather-card-container">
        {weatherData && !loading && (
          <div className="flex items-center justify-center flex-col p-8 weather-card">
            {loading && <p className="">Loading...</p>}
            {isError && (
              <p className="text-red-600 mb-4 py-2 bg-red-100 rounded-md w-full">
                {isError}
              </p>
            )}
            <div className="flex gap-2 items-center mb-3 w-full">
              <input
                placeholder="Search by location"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border px-4 py-2 rounded-sm border-gray-300 bg-gray-100 w-full text-gray-600"
              />
              <button
                className="search-button bg-black! text-white text-sm! hover:border-black!"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
              style={{ height: "100px", width: "100px" }}
            />
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-lg md:text-2xl font-bold flex items-start justify-center primary">
                {/* <FaLocationDot />  */}
                {weatherData.location.name}, {weatherData.location.country}
              </h2>
              <p className="text-xl text-black">
                {/* <span className="font-bold">Temperature:</span>{" "} */}
                <span className="text-8xl font-extrabold">
                  {weatherData.current.temp_c}°C
                </span>
              </p>
              <p className="text-xl text-black">
                <span className="font-bold">Condition:</span>{" "}
                {weatherData.current.condition.text}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-between">
                {weatherData.forecast &&
                weatherData.forecast.forecastday[0].astro ? (
                  <p className="flex items-center gap-2 text-black">
                    <FiSunrise /> <span className="font-bold">Sunrise:</span>{" "}
                    {weatherData.forecast.forecastday[0].astro.sunrise}
                  </p>
                ) : (
                  <p>Sunrise data not available</p>
                )}
                {weatherData.forecast &&
                weatherData.forecast.forecastday[0].astro ? (
                  <p className="flex items-center gap-2 text-black">
                    <FiSunset /> <span className="font-bold">Sunrise:</span>{" "}
                    {weatherData.forecast.forecastday[0].astro.sunset}
                  </p>
                ) : (
                  <p className="text-red-600">Sunset data not available</p>
                )}
              </div>
              {weatherData.alerts?.alert?.length > 0 ? (
                <p className="text-red-600 font-bold">
                  Alert: {weatherData.alerts.alert[0].headline}
                </p>
              ) : (
                <p className="text-green-600">No weather alerts</p>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-white mt-4">Design & Develop By: Bishal Gurung</p>

      <p className="text-white mt-4 flex gap-2 items-center justify-center">
        Follow Me:{" "}
        <a href="https://www.linkedin.com/in/gurung18/" target="_blank">
          <span className="text-2xl" style={{ color: "#0a66c2" }}>
            <FaLinkedin />
          </span>{" "}
        </a>
        <a href="https://github.com/gurungbsal18" target="_blank">
          <span className="text-white text-2xl">
            <FaGithub />
          </span>{" "}
        </a>
      </p>
    </>
  );
}

export default GetWeatherApi;
