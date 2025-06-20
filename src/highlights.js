import { weatherData } from "./fetcher";

export function displayHighlights() {
  const data = weatherData.currentConditions;

  /*
    const uv = data.uvindex;
    const windSpeed = data.windspeed;
    const windDirection = data.winddir;
    const sunrise = data.sunrise;
    const sunset = data.sunset;
    const humidity = data.humidity;
    const visibility = data.visibility;
    const airQuality = data.aqius; //US rating;
    */

  const uv = document.querySelector("#uv > span");
  uv.textContent = data.uvindex;

  const windSpeed = document.querySelector("#wind-speed");
  windSpeed.textContent = data.windspeed + "km/h";

  const windDirection = document.querySelector("#wind-direction");
  windDirection.textContent = data.winddir + "°";

  const sunrise = document.querySelector("#sunrise > span");
  sunrise.textContent = data.sunrise;

  const sunset = document.querySelector("#sunset > span");
  sunset.textContent = data.sunset;

  const humidity = document.querySelector("#humidity > span");
  humidity.textContent = data.humidity + "%";

  const visibility = document.querySelector("span#visibility");
  visibility.textContent = data.visibility + "mi";

  const airQuality = document.querySelector("span#air-quality");
  airQuality.textContent = data.aqius;
}
