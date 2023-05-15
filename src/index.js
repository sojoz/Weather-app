//importing icons

import rainIcon from "./svg/rain.svg";
import overcastIcon from "./svg/cloudy.svg";
import brokenCloudsIcon from "./svg/cloudy-day-1.svg";
import drizzleIcon from "./svg/rainy-1.svg";
import snowIcon from "./svg/snowy-2.svg";
import clearIcon from "./svg/sunny-day.svg";
import ThunderstormIcon from "./svg/thunder.svg";
import fewCloudsIcon from "./svg/cloudy-day-1.svg";
import freezingRainIcon from "./svg/rain-and-snow-mix.svg";
import scatteredCloudsIcon from "./svg/cloudy-day-3.svg";
import lightSnowIcon from "./svg/snowy-1.svg";
import mistIcon from "./svg/fog.svg";
import lightRainIcon from "./svg/rainy-1-day.svg";
import heavySnowIcon from "./svg/snowy-3.svg";

// Date and Time code

let p = document.querySelector("dateTime1");
let pdate = document.querySelector("dateTime2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let day = days[now.getDay()];
console.log(day);

let months = [
  "Jan",
  "Feb",
  "Match",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const today = new Date();
let month = months[now.getMonth()];
console.log(month);

let monthDay = today.getUTCDate();

const timeNow = new Date();
const currentTime = now.toLocaleTimeString([], { timeStyle: "short" });
console.log(currentTime);

dateTime1.innerHTML = `${day}, ${monthDay} ${month} `;
dateTime2.innerHTML = `${currentTime} `;

const weatherIcon = document.querySelector(".sun-picture");

// Form code

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#searchbarInput");

  let h2 = document.querySelector("h2");
  if (input.value) {
    h2.innerHTML = `${input.value}`;
  } else {
    h2.innerHTML = null;
    alert(`Please enter a City`);
  }
}
let form = document.querySelector("#locationForm");
form.addEventListener("submit", search);

// Degrees code

function convertTemperature(event) {
  event.preventDefault();
  let button = document.querySelector("#mainTemperature");
  let temperature = parseFloat(button.innerHTML);
  let isCelsius = true;

  if (button.getAttribute("data-original-temp") === null) {
    button.setAttribute("data-original-temp", temperature);
  } else {
    temperature = parseFloat(button.getAttribute("data-original-temp"));
  }

  if (button.innerHTML.includes("°F")) {
    button.innerHTML = `${temperature}°C`;
    isCelsius = true;
  } else {
    button.innerHTML = `${temperature * 1.8 + 32}°F`;
    isCelsius = false;
  }

  return isCelsius;
}

let cTof = document.querySelector("#mainTemperature");
cTof.addEventListener("click", convertTemperature);

// Geolocation and temperature/
//Temperature

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchbarInput").value;
  let city = searchInput;
  let apiKey = "05af9d47239cd7aaf08f34ff3be4d1d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    showTemperature(response);
  });
}
let form1 = document.querySelector("#locationForm");
form1.addEventListener("submit", searchLocation);

displayForecast();

// Display for temperature and weather features
function showTemperature(response) {
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);
  let button1 = document.querySelector("#mainTemperature");
  let tempDescription = response.data.weather[0].description;
  let windSpeed1 = Math.round(response.data.wind.speed);
  let humdity1 = response.data.main.humidity;
  h2.innerHTML = response.data.name;

  button1.innerHTML = `${temperature}°C`;
  weatherText.innerHTML = `${tempDescription}`;
  windSpeed.innerHTML = `Wind: ${windSpeed1} m/h`;
  humidity.innerHTML = `Humidity: ${humdity1}%`;

  changeWeatherIcon(response);
}

// Weather icons
function changeWeatherIcon(response) {
  if (response.data.weather[0].main == "Rain") {
    weatherIcon.src = rainIcon;
  } else if (response.data.weather[0].description == "broken clouds") {
    weatherIcon.src = brokenCloudsIcon;
  } else if (response.data.weather[0].main == "Drizzle") {
    weatherIcon.src = drizzleIcon;
  } else if (response.data.weather[0].main == "Snow") {
    weatherIcon.src = snowIcon;
  } else if (response.data.weather[0].main == "Clear") {
    weatherIcon.src = clearIcon;
  } else if (response.data.weather[0].main == "Thunderstorm") {
    weatherIcon.src = ThunderstormIcon;
  } else if (response.data.weather[0].description == "few clouds") {
    weatherIcon.src = fewCloudsIcon;
  } else if (response.data.weather[0].description == "freezing rain") {
    weatherIcon.src = freezingRainIcon;
  } else if (response.data.weather[0].description == "scattered clouds") {
    weatherIcon.src = scatteredCloudsIcon;
  } else if (response.data.weather[0].description == "overcast clouds") {
    weatherIcon.src = overcastIcon;
  } else if (response.data.weather[0].description == "light snow") {
    weatherIcon.src = lightSnowIcon;
  } else if (response.data.weather[0].description == "mist") {
    weatherIcon.src = mistIcon;
  } else if (response.data.weather[0].description == "light rain") {
    weatherIcon.src = lightRainIcon;
  } else if (response.data.weather[0].description == "heavy snow") {
    weatherIcon.src = heavySnowIcon;
  }
}

// Display Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecastContainer");
  let forecastHTML = `<div class="row">`;
  let days = ["Thurs", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col">
      <h4>{$day}</h4>
      <img src="src/svg/fair-day.svg"class="weather-icon"></img> 13°C
      <br>
      </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
}
// Geolocation

function showPosition(position) {
  let apiKey = "05af9d47239cd7aaf08f34ff3be4d1d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentLocation);
