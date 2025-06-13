import "./reset.css";
import "./style.css";

import { fetchWeather } from "./fetcher";
import { displayData } from "./page";
import { getHourlyForecast } from "./hourly-forecast";

console.log("Script entry point working");

const search = document.querySelector("#search-bar");
search.addEventListener("keydown", search_handler);

fetchAndDisplayWeather();

function fetchAndDisplayWeather() {
  const location = search.value || "Toronto";
  fetchWeather(location).then((weatherData) => {
    //Current conditions
    displayData(weatherData);

    //Hourly conditions of the day
    getHourlyForecast(weatherData);
  });
}

console.log(search);
function search_handler(e) {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    e.preventDefault();
    fetchAndDisplayWeather();
  }
}
