import { weatherData } from "./fetcher";

export function displayHighlights() {
  const data = weatherData.currentConditions;

  const uv = document.querySelector("#uv-chart");
  uv.setAttribute("data-content", data.uvindex);

  const uvBar = document.querySelector("#uv-chart #uv-bar");
  const rotateDeg = getUvBarRotateDeg(7);
  uvBar.style.transform = `rotate(${rotateDeg})`;
  const uvLevel = document.querySelector("#uv-chart + .sub-data");
  uvLevel.textContent = getUVLevel(data.uvindex);

  const windSpeed = document.querySelector("#wind-speed .number");
  windSpeed.textContent = data.windspeed;

  const windDirection = document.querySelector("#wind-direction > span");
  windDirection.textContent = getWindDirection(data.winddir);

  const sunrise = document.querySelector("#sunrise > span");
  sunrise.textContent = convertTime(data.sunrise);

  const sunset = document.querySelector("#sunset > span");
  sunset.textContent = convertTime(data.sunset);

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
  const airQualityLevel = document.querySelector("#air-quality + .sub-data");
  airQualityLevel.textContent = getAirQualityLevel(data.aqius);
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
  if (index < 40) return "Too Dry";
  if (index > 40 && index < 60) return "Comfortable";
  else return "Too Humid";
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
    return "Thin Fog";
  } else if (dist > 0.5) {
    return "Light Fog";
  } else if (dist > 0.3) {
    return "Moderate Fog";
  } else {
    return "Thick Fog";
  }
}

function getAirQualityLevel(index) {
  if (index <= 50) return "Low Health Risk";
  if (index > 50 && index <= 100) return "Moderate";
  if (index > 100 && index <= 150) return "Unhealthy for Sensitive Groups";
  if (index > 150 && index <= 200) return "Unhealthy";
  if (index > 200 && index <= 300) return "Very Unhealthy";
  else return "Hazardous";
}

function getUVLevel(index) {
  /* 
  UV Index Rating
  0-2 = low, 
  3-5 = Moderate, 
  6-7 = high, 
  8-9 = Very high, 
  10 = Extreme
  */
  if (index <= 2) return "Low";
  if (index >= 3 && index <= 5) return "Moderate";
  if (index >= 6 && index <= 7) return "High";
  if (index >= 8 && index <= 9) return "Very High";
  else return "Extreme";
}

function convertTime(time) {
  //Example: convert 19:02:30 -> 7:02 PM
  let suffix = " AM";

  let hour = Number(time.slice(0, 2));
  if (hour > 12) {
    hour -= 12;
    suffix = " PM";
  }

  const minute = time.slice(3, 5);

  const converted = hour + ":" + minute + suffix;
  console.log(converted);
  return converted;
}
