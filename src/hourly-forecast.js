import { getHours } from "date-fns";

export function getHourlyForecast(data) {
  const hourNow = getHours(new Date());
  console.log("Hour: " + hourNow);
  const hours = data.days[0].hours;
  console.log(hours);

  return hours.map((hour, index) => {
    return {
      time: convertHourFormat(index),
      conditions: hour.conditions,
      temperature: hour.temp,
    };
  });
}

//Convert hour format from 24 to 12
function convertHourFormat(hour) {
  if (hour > 12) {
    return hour - 12 + "PM";
  }

  return hour + "AM";
}
