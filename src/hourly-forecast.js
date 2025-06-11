import { getHours } from "date-fns";
import { convertToCelcius } from "./page";

export function getHourlyForecast(data) {
  const hourNow = getHours(new Date());
  console.log("Hour: " + hourNow);

  const hours = [];
  let day = 0;
  let hour = hourNow;

  for (let i = 0; i <= 24; i++) {
    if (hour > 23) {
      hour = 0;
      day++;
    }
    const hourForecast = data.days[day].hours[hour];

    const simplifiedHourForecast = {
      time: convertHourFormat(hour),
      conditions: hourForecast.conditions,
      temp: hourForecast.temp,
    };

    hours.push(simplifiedHourForecast);

    hour++;
  }

  populateHourlyForecast(hours);
}

function populateHourlyForecast(hours) {
  const container = document.querySelector(".hourly-forecasts");

  container.textContent = "";

  hours.forEach((hour) => {
    const card = makeHourlyCard(hour);
    container.appendChild(card);
  });
}

function makeHourlyCard(hour) {
  const card = document.createElement("div");

  const condition = document.createElement("div");
  const temp = document.createElement("div");
  const time = document.createElement("div");

  card.classList.add("hourly-card");
  temp.classList.add("temperature");
  condition.classList.add("condition");
  time.classList.add("time");

  card.appendChild(temp);
  card.appendChild(condition);
  card.appendChild(time);

  temp.textContent = convertToCelcius(hour.temp);
  condition.textContent = hour.conditions;
  time.textContent = hour.time;

  return card;
}

//Convert hour format from 24 to 12
function convertHourFormat(hour) {
  if (hour > 12) {
    return hour - 12 + "PM";
  }

  return hour + "AM";
}
