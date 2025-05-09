import { getHours } from "date-fns";

export function getHourlyForecast(data) {
  const hourNow = getHours(new Date());
  console.log("Hour: " + hourNow);
  const hours = data.days[0].hours;
  console.log(hours);

  return hours.map((hour, index) => {
    return {
      time: index,
      conditions: hour.conditions,
      temperature: hour.temp,
    };
  });
}
