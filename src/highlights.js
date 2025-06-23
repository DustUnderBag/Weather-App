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
  windDirection.textContent = getWindDirection(data.winddir);

  const sunrise = document.querySelector("#sunrise > span");
  sunrise.textContent = data.sunrise;

  const sunset = document.querySelector("#sunset > span");
  sunset.textContent = data.sunset;

  const humidity = document.querySelector("#humidity .number");
  humidity.textContent = data.humidity;
  const humidityLevel = document.querySelector("#humidity + .sub-data");
  humidityLevel.textContent = getHumidityComfortLevel(data.humidity);

  const visibility = document.querySelector("#visibility .number");
  visibility.textContent = data.visibility;
  const visibilityLevel = document.querySelector("#visibility + .sub-data");
  visibilityLevel.textContent = getVisibilityLevel(data.visibility);

  const airQuality = document.querySelector("#air-quality .number");
  airQuality.textContent = data.aqius;
}

function getUvBarRotateDeg(uvIndex) {
  if (uvIndex > 10) uvIndex = 10;
  const deg = (uvIndex / 10) * 180;
  return deg + "deg";
}

function getWindDirection(deg) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 22.5) % 16;
  return directions[index];
}

function getHumidityComfortLevel(index) {
  if (index < 40) return "Too dry";
  if (index > 40 && index < 60) return "Comfortable";
  else return "Too humid";
}

function getVisibilityLevel(dist) {
  //Rate in miles
  if (dist > 7) {
    return "Very clear";
  } else if (dist > 6.2) {
    return "Clear";
  } else if (dist > 3.1) {
    return "Light haze";
  } else if (dist > 1.7) {
    return "Haze";
  } else if (dist > 1.2) {
    return "Thin fog";
  } else if (dist > 0.5) {
    return "Light fog";
  } else if (dist > 0.3) {
    return "Moderate fog";
  } else {
    return "Thick fog";
  }
}
