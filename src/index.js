import "./reset.css";
import "./style.css";

import { fetchWeather, tempUnit, updateTempUnit } from "./fetcher";
import { displayData } from "./page";
import { getHourlyForecast } from "./hourly-forecast";
import { getDailyForecasts } from "./daily-forecasts";
import { displayHighlights } from "./highlights";

console.log("Script entry point working");

const search = document.querySelector("#search-bar");
search.addEventListener("keydown", search_handler);

fetchAndDisplayWeather();

function fetchAndDisplayWeather() {
  const location = search.value || "Toronto";
  fetchWeather(location).then(visualizeData);
}

function visualizeData() {
  //Current conditions
  displayData();

  //Hourly conditions of the day
  getHourlyForecast();

  //Daily conditions of the week
  getDailyForecasts();

  displayHighlights();
}

function search_handler(e) {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    e.preventDefault();
    fetchAndDisplayWeather();
  }
}

const tempUnitToggles = document.querySelectorAll(
  "#unit-switch input[type='radio']",
);
tempUnitToggles.forEach((toggle) =>
  toggle.addEventListener("click", () => {
    //Determine if unit is changed, don't do anything if unit isn't changed.
    if (toggle.value !== tempUnit) {
      updateTempUnit();
      visualizeData();
    }
  }),
);
