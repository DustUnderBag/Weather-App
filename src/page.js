import { tempUnit } from "./fetcher";
import { format } from "date-fns";

const dayInWeek = document.querySelector(".day-in-week");
const date = document.querySelector(".date");
const location = document.querySelector(".location");
const condition = document.querySelector(".condition");

const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");
const maxTemperature = document.querySelector(".max-temperature");
const minTemperature = document.querySelector(".min-temperature");

export function displayData(weatherData) {
  displayCurrentConditions(weatherData);
}

function displayCurrentConditions(weatherData) {
  //Data at this moment
  const currentData = weatherData.currentConditions;

  //Data throughout the day
  const todayData = weatherData.days[0];

  //Date and Location
  date.textContent = convertDatetime(todayData.datetime);
  location.textContent = weatherData.resolvedAddress;

  //Weather Data
  condition.textContent = currentData.conditions;
  temperature.textContent = convertToCelcius(currentData.temp);
  feelsLike.textContent = convertToCelcius(currentData.feelslike);

  maxTemperature.textContent = convertToCelcius(todayData.tempmax);
  minTemperature.textContent = convertToCelcius(todayData.tempmin);
}

function convertToCelcius(temp) {
  if (tempUnit === "C") {
    return Math.round((temp - 32) / 1.8);
  } else {
    return Math.round(temp);
  }
}

//Please insert RAW datetime from the weather api
function convertDatetime(datetime) {
  const [yy, mm, dd] = datetime.split("-");
  const dayoftoday = new Date(yy, mm - 1, dd);
  return format(dayoftoday, "EEEE, do MMMM");
}
