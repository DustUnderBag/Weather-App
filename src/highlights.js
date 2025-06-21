import { weatherData } from "./fetcher";

/* 
  UV Index Rating
  0-2 = low, 
  3-5 = Moderate, 
  6-7 = high, 
  8-10 = Very high, 
  11 = Extreme
*/
export function displayHighlights() {
  const data = weatherData.currentConditions;

  const uv = document.querySelector("#uv-chart");
  uv.setAttribute("data-content", data.uvindex);

  const uvBar = document.querySelector("#uv-chart #uv-bar");
  const rotateDeg = getUvBarRotateDeg(data.uvindex);
  uvBar.style.transform = `rotate(${rotateDeg})`;

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

function getUvBarRotateDeg(uvIndex) {
  if (uvIndex > 10) uvIndex = 10;
  const deg = (uvIndex / 10) * 180;
  return deg + "deg";
}
