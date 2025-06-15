import { format } from "date-fns";
import { convertToCelcius } from "./page";
import { fetchWeather, fetchWeatherIcon } from "./fetcher";

export function getDailyForecasts(data) {
  const days = [];

  let day = 0;

  //Obtain next 10 daily forecasts(incld. today).
  while (day < 10) {
    const forecast = data.days[day];

    //Simplification - only keeps datetime, conditions, precipprob, temp.
    const simplifiedForecast = {
      datetime: forecast.datetime,
      conditions: forecast.conditions,
      precipprob: forecast.precipprob,
      temp: forecast.temp,
      icon: forecast.icon,
    };

    days.push(simplifiedForecast);

    day++;
  }
  populateDailyForecast(days);
  console.log(days);
}

function populateDailyForecast(days) {
  const container = document.querySelector(".daily-forecasts");

  container.textContent = "";

  days.forEach((day) => {
    const card = makeDailyCard(day);
    container.appendChild(card);
  });
}

function makeDailyCard(day) {
  const card = document.createElement("div");

  const dayInWeek = document.createElement("div");

  const condition = document.createElement("div");
  const weatherIcon = document.createElement("img");
  const precipprob = document.createElement("div");
  const temp = document.createElement("div");

  card.classList.add("daily-card");
  dayInWeek.classList.add("daily-day-in-week");
  condition.classList.add("daily-condition");
  weatherIcon.classList.add("weather-icon");
  precipprob.classList.add("daily-precipprob");
  temp.classList.add("daily-temperature");

  card.appendChild(dayInWeek);
  card.appendChild(condition);
  card.appendChild(temp);
  condition.appendChild(weatherIcon);
  condition.appendChild(precipprob);

  const [yr, mm, dd] = day.datetime.split("-");
  dayInWeek.textContent = format(new Date(yr, mm - 1, dd), "E");

  fetchWeatherIcon(day.icon).then((icon) => (weatherIcon.src = icon));

  precipprob.textContent = day.precipprob + "%";
  temp.textContent = convertToCelcius(day.temp);

  return card;
}
