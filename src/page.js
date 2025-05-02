import { fetchWeather, tempUnit } from "./fetcher";

const dayInWeek = document.querySelector(".day-in-week");
const date = document.querySelector(".date");
const location = document.querySelector(".location");
const condition = document.querySelector(".condition");

const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");
const maxTemperature = document.querySelector(".max-temperature");
const minTemperature = document.querySelector(".min-temperature");

const weatherData = await fetchWeather();
const today = weatherData.days[0];

export function displayData() {
  displayCurrentConditions();
}

function displayCurrentConditions() {
  date.textContent = today.datetime;
  location.textContent = weatherData.address;
  condition.textContent = today.conditions;

  temperature.textContent = convertToCelcius(today.temp);
  feelsLike.textContent = convertToCelcius(today.feelslike);
  maxTemperature.textContent = convertToCelcius(today.tempmax);
  minTemperature.textContent = convertToCelcius(today.tempmin);
}

function convertToCelcius(temp) {
  if (tempUnit === "celcius") {
    return Math.round((temp - 32) / 1.8);
  } else {
    return Math.round(temp);
  }
}
