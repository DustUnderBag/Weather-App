import { getHours, addHours } from "date-fns";
import { convertToCelcius } from "./page";

export function getHourlyForecast(data) {
  const hours = [];
  let day = 0;
  let hour = getCurrentLocalHour(data.tzoffset);

  //Obtain the next 24 hourly forecast.
  for (let i = 0; i <= 24; i++) {
    if (hour > 23) {
      hour = 0;
      day++;
    }
    console.log(hour);
    //The current iterated hour forecast.
    const hourForecast = data.days[day].hours[hour];

    //Simplification - only keeps time, conditions and temp.
    const simplifiedHourForecast = {
      time: hourForecast.datetime,
      conditions: hourForecast.conditions,
      temp: hourForecast.temp,
    };

    hours.push(simplifiedHourForecast);

    hour++;
  }

  console.log(hours);

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

  time.textContent = toHourDisplay(hour.time);

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

function getCurrentLocalHour(timezoneOffset) {
  //UTC is the standard time, without timezone.
  const currentUTCHour = new Date().getUTCHours();

  const localHour = Math.floor(Math.abs(currentUTCHour + timezoneOffset));
  if (localHour >= 24) localHour - 24;
  console.log("UTC: " + currentUTCHour, " Local time: " + localHour);

  return localHour;
}
