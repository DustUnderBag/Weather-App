import { format } from "date-fns";
import { convertToCelcius } from "./page";

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
    };

    days.push(simplifiedForecast);

    day++;
  }
  console.log(days);
  populateDailyForecast(days);
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
  const precipprob = document.createElement("div");
  const temp = document.createElement("div");

  card.classList.add("daily-card");
  dayInWeek.classList.add("daily-day-in-week");
  condition.classList.add("daily-condition");
  precipprob.classList.add("daily-precipprob");
  temp.classList.add("daily-temperature");

  card.appendChild(dayInWeek);
  card.appendChild(condition);
  card.appendChild(temp);

  const [yr, mm, dd] = day.datetime.split("-");
  console.log(new Date(yr, mm - 1, dd));
  dayInWeek.textContent = format(new Date(yr, mm - 1, dd), "E");

  condition.textContent = day.conditions;
  condition.appendChild(precipprob);

  precipprob.textContent = day.precipprob + "%";
  temp.textContent = convertToCelcius(day.temp);

  return card;
}
