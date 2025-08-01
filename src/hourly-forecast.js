import { convertToCelcius } from "./page";
import { getHours } from "date-fns";
import { fetchWeatherIcon, weatherData } from "./fetcher";

export function getHourlyForecast() {
  document.querySelector("#today-description").textContent =
    weatherData.days[0].description;

  const hours = [];
  let day = 0;
  let hour = getCurrentLocalHour(weatherData.timezone);

  //Obtain the next 24 hourly forecast.
  for (let i = 0; i <= 24; i++) {
    //Jump to the next day
    if (hour > 23) {
      hour = 0;
      day++;
    }

    //The current iterated hour forecast.
    const hourForecast = weatherData.days[day].hours[hour];

    //Simplification - only keeps time, conditions and temp.
    const simplifiedHourForecast = {
      time: hourForecast.datetime,
      conditions: hourForecast.conditions,
      temp: hourForecast.temp,
      icon: hourForecast.icon,
    };

    hours.push(simplifiedHourForecast);

    hour++;
  }

  populateHourlyForecast(hours);
}

function populateHourlyForecast(hours) {
  const container = document.querySelector("#hourly-cards");

  container.textContent = "";

  hours.forEach((hour) => {
    const card = makeHourlyCard(hour);
    container.appendChild(card);
  });
}

function makeHourlyCard(hour) {
  const card = document.createElement("div");

  const weatherIcon = document.createElement("img");
  const temp = document.createElement("div");
  const time = document.createElement("div");

  card.classList.add("hourly-card");
  time.classList.add("time");
  weatherIcon.classList.add("weather-icon");
  temp.classList.add("temperature");

  card.appendChild(time);
  card.appendChild(weatherIcon);
  card.appendChild(temp);

  time.textContent = toHourDisplay(hour.time);

  fetchWeatherIcon(hour.icon).then((icon) => (weatherIcon.src = icon));

  temp.textContent = convertToCelcius(hour.temp);

  return card;
}

//Convert raw time to readable 12-hour format
//e.g 13:00:00 --> 1PM
function toHourDisplay(hour) {
  const hourDisplay = Number(hour.slice(0, 2));

  if (hourDisplay === 12) return "12PM";

  if (hourDisplay >= 13) {
    return hourDisplay - 12 + "PM";
  }

  return hourDisplay + "AM";
}

//Returns local hour 0-24, without unit
function getCurrentLocalHour(timezone) {
  //toLocaleString returns date string using given timezone.
  let localTime = new Date().toLocaleString("en-US", { timeZone: timezone });
  return getHours(localTime);
}
