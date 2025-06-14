/*
    Needed data:
    Location
    Weather condition at the moment
    Temperature
    Min & max temperature
    Feels like temperature
    Description of the day
    May include wind speed, humidity, visibility.
    
    Hourly forecast of today
    - List hours from NOW to the next 24 hours e.g. Now(1am) to next 1am
    - weather and temperature of that hour.
    - get icon
    
    Daily Forecast
    - On the top, display description of the next few days.
    - List the following 9 days.(from today to 9 days later).
    - weather condition
    - min & max temperature
    
*/

export let tempUnit = "C";

export async function fetchWeather(location) {
  const key = "8UT7GXF3M33L57GR7VV2CNKCP";
  const contentType = "json";
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${key}&contentType=${contentType}`;

  const response = await fetch(url, {
    method: "GET",
  });
  const json = await response.json();
  console.log(json);
  return json;
}
