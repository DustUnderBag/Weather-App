import { fetchWeather, tempUnit } from "./fetcher";
import { format } from "date-fns";

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
  date.textContent = convertDatetime(today.datetime);
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

//Please insert RAW datetime from the weather api
function convertDatetime(datetime) {
  const [yy, mm, dd] = datetime.split("-");
  const dayoftoday = new Date(yy, mm - 1, dd);
  return format(dayoftoday, "EEEE, do MMMM");
}
