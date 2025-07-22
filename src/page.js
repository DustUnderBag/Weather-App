import { weatherData, tempUnit, fetchWeatherIcon } from "./fetcher";
import { format } from "date-fns";

const date = document.querySelector("#date");
const location = document.querySelector("#location");
const weatherIcon = document.querySelector("img#current-weather-icon");
const condition = document.querySelector("#current-condition");
const precipprob = document.querySelector("#current-precipprob > span");

const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");
const maxTemperature = document.querySelector(".max-temperature");
const minTemperature = document.querySelector(".min-temperature");

export function displayData() {
  displayCurrentConditions();
}

function displayCurrentConditions() {
  //Data at this moment
  const currentData = weatherData.currentConditions;

  //Data throughout the day
  const todayData = weatherData.days[0];

  //Date and Location
  date.textContent = convertDatetime(todayData.datetime);
  location.textContent = weatherData.address;

  //Weather icon
  fetchWeatherIcon(currentData.icon).then((icon) => (weatherIcon.src = icon));

  //Weather Data
  condition.textContent = currentData.conditions;
  temperature.textContent = convertToCelcius(currentData.temp);
  feelsLike.textContent = convertToCelcius(currentData.feelslike);
  precipprob.textContent = currentData.precipprob + "%";

  maxTemperature.textContent = "H: " + convertToCelcius(todayData.tempmax);
  minTemperature.textContent = "L: " + convertToCelcius(todayData.tempmin);
}

export function convertToCelcius(temp) {
  if (tempUnit === "C") {
    return Math.round((temp - 32) / 1.8) + "°C";
  } else {
    return Math.round(temp) + "°F";
  }
}

//Please insert RAW datetime from the weather api
function convertDatetime(datetime) {
  const [yy, mm, dd] = datetime.split("-");
  const dayoftoday = new Date(yy, mm - 1, dd);
  return format(dayoftoday, "EEEE, do MMMM");
}
