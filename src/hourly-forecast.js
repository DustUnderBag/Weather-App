import { getHours } from "date-fns";

export function getHourlyForecast(data) {
  const hourNow = getHours(new Date());
  console.log("Hour: " + hourNow);
  const hours = data.days[0].hours;
  console.log(hours);

  const formattedHours = hours.map((hour, index) => {
    return {
      time: convertHourFormat(index),
      conditions: hour.conditions,
      temperature: hour.temp,
    };
  });

  generateHourlyCards(formattedHours);
}

//Convert hour format from 24 to 12
function convertHourFormat(hour) {
  if (hour > 12) {
    return hour - 12 + "PM";
  }

  return hour + "AM";
}

function generateHourlyCards(hours) {
  const container = document.querySelector(".hourly-forecasts");

  hours.forEach((data) => {
    const card = makeHourlyCard(data);
    container.appendChild(card);
  });
}

function makeHourlyCard(data) {
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

  temp.textContent = data.temperature;
  condition.textContent = data.conditions;
  time.textContent = data.time;

  return card;
}
