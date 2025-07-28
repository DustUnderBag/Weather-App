/*
    Needed data:
    Location
    Weather condition at the moment
    Temperature
    Min & max temperature
    Feels like temperature
    Description of the day

    
    Hourly forecast of today
    - List hours from NOW to the next 24 hours e.g. Now(1am) to next 1am
    - weather and temperature of that hour.
    - get icon
    
    Daily Forecast
    - On the top, display description of the next few days.
    - List the following 9 days.(from today to 9 days later).
    
    Daily Card
    - Day in the week
    - weather condition, if condition is rain, show probability of rain(preciprop)
    - temperature

    Highlights 6 cards
    - UV Index  has (0-2 = low, 3-5 = Moderate, 6-7 = high, 8-10 = Very high, 11 = Extreme)
    - Wind speed & Wind direction has
    - Sunrise and Sunset  has
    - Humidity  has
    - Visibility  has
    - Air Quality
    
*/

export let tempUnit = "C";
export let weatherData;
export async function fetchWeather(location) {
  try {
    const key = "8UT7GXF3M33L57GR7VV2CNKCP";
    const contentType = "json";
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${key}&contentType=${contentType}&elements=%2Baqius`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const json = await response.json();
    weatherData = json;
    return json;
  } catch (error) {
    alert(getErrorMessage(error.message));
  }
}

export async function fetchWeatherIcon(iconName) {
  const icon = await import(`./icon-set/${iconName}.svg`);
  return icon.default;
}

export function updateTempUnit() {
  const chosenTempUnit = document.querySelector(
    "#unit-switch input[type='radio']:checked",
  );
  tempUnit = chosenTempUnit.value;
}

function getErrorMessage(code) {
  if (code === "400") return "Bad request: Invalid location.";
  if (code === "401")
    return "Unathorized: Invalid API key or account inactive/disabled";
  if (code === "429") return "Too many requests: Queries exceeded your limit";
  if (code === "500")
    return "Server error: Servers encounter an expected error.";
}
