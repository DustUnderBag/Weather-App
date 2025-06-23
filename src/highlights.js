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

  const windSpeed = document.querySelector("#wind-speed .number");
  windSpeed.textContent = data.windspeed;

  const windDirection = document.querySelector("#wind-direction > span");
  windDirection.textContent = data.winddir + "°";

  const sunrise = document.querySelector("#sunrise > span");
  sunrise.textContent = data.sunrise;

  const sunset = document.querySelector("#sunset > span");
  sunset.textContent = data.sunset;

  const humidity = document.querySelector("#humidity .number");
  humidity.textContent = data.humidity;

  const visibility = document.querySelector("#visibility .number");
  visibility.textContent = data.visibility;

  const airQuality = document.querySelector("#air-quality .number");
  airQuality.textContent = data.aqius;
}

function getUvBarRotateDeg(uvIndex) {
  if (uvIndex > 10) uvIndex = 10;
  const deg = (uvIndex / 10) * 180;
  return deg + "deg";
}
