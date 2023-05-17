//cancel out importing files for DESKTOP usage

import rainIcon from "./svg/rain.svg";
import overcastIcon from "./svg/cloudy.svg";
import brokenCloudsIcon from "./svg/cloudy-day-1.svg";
import drizzleIcon from "./svg/rainy-1.svg";
import snowIcon from "./svg/snowy-2.svg";
import clearIcon from "./svg/c.svg";
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
const forecastIcon = document.querySelector(".weather-icon");

// formatting forecast days

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
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

// Geolocation and temperature

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

//API weather Forecast

function getForecast(coordinates) {
  console.log(coordinates);
  let lat = coordinates.lat;
  let lon = coordinates.lon;

  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
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

  getForecast(response.data.coord);
}

//Display Forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecastContainer");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    let temperatureMax = Math.round(forecastDay.temp.max);
    let temperatureMin = Math.round(forecastDay.temp.min);
    let forecastIcon = getForecastIcon(forecastDay);

    if (index >= 1 && index <= 4) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col col-3">
      <h4>${formatDay(forecastDay.dt)}</h4>
      <img src="${forecastIcon}"class="weather-icon" alt="weatherIcon" ></img>
      <br>
      <span class="weather-forcast-min">${temperatureMin}°C </span>
      <br>
      <span class="weather-forcast-max">${temperatureMax}°C</span>
      
      </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

// Cancel function changeWeatherIcon and getForecastIcon for DESKTOP

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

function getForecastIcon(response) {
  if (response.data.weather[0].main == "Rain") {
    forecastIcon.src = rainIcon;
  } else if (response.data.weather[0].description == "broken clouds") {
    forecastIcon.src = brokenCloudsIcon;
  } else if (response.data.weather[0].main == "Drizzle") {
    forecastIcon.src = drizzleIcon;
  } else if (response.data.weather[0].main == "Snow") {
    forecastIcon.src = snowIcon;
  } else if (response.data.weather[0].main == "Clear") {
    forecastIcon.src = clearIcon;
  } else if (response.data.weather[0].main == "Thunderstorm") {
    forecastIcon.src = ThunderstormIcon;
  } else if (response.data.weather[0].description == "few clouds") {
    forecastIcon.src = fewCloudsIcon;
  } else if (response.data.weather[0].description == "freezing rain") {
    forecastIcon.src = freezingRainIcon;
  } else if (response.data.weather[0].description == "scattered clouds") {
    forecastIcon.src = scatteredCloudsIcon;
  } else if (response.data.weather[0].description == "overcast clouds") {
    forecastIcon.src = overcastIcon;
  } else if (response.data.weather[0].description == "light snow") {
    forecastIcon.src = lightSnowIcon;
  } else if (response.data.weather[0].description == "mist") {
    forecastIcon.src = mistIcon;
  } else if (response.data.weather[0].description == "light rain") {
    forecastIcon.src = lightRainIcon;
  } else if (response.data.weather[0].description == "heavy snow") {
    forecastIcon.src = heavySnowIcon;
  }
}
// Cancel function changeWeatherIcon and getForecastIcon for NETLIFY

//function getForecastIcon(forecastDay) {
//if (forecastDay.weather[0].main == "Clear") {
//return "src/svg/sunny-day.svg";
//} else if (forecastDay.weather[0].description == "broken clouds") {
//return "src/svg/cloudy.svg";
//} else if (forecastDay.weather[0].main == "Drizzle") {
//return "src/svg/cloudy-day-1.svg";
//} else if (forecastDay.weather[0].main == "Snow") {
//return "src/svg/rainy-1.svg";
//} else if (forecastDay.weather[0].main == "Rain") {
//return "src/svg/rain.svg";
//} else if (forecastDay.weather[0].main == "Thunderstorm") {
//return "src/svg/sunny-day.svg";
//} else if (forecastDay.weather[0].description == "few clouds") {
//return "src/svg/fair-day.svg";
//} else if (forecastDay.weather[0].description == "freezing rain") {
//return "src/svg/cloudy-day-1.svg";
//} else if (forecastDay.weather[0].description == "scattered clouds") {
//return "src/svg/cloudy-day-3.svg";
//} else if (forecastDay.weather[0].description == "overcast clouds") {
//return "src/svg/cloudy-day-3.svg";
//} else if (forecastDay.weather[0].description == "light snow") {
//return "src/svg/snowy-1.svg";
//} else if (forecastDay.weather[0].description == "mist") {
//return "src/svg/fog.svg";
//} else if (forecastDay.weather[0].description == "light rain") {
//return "src/svg/rainy-1-day.svg";
//} else if (forecastDay.weather[0].description == "heavy snow") {
// return "src/svg/snowy-3.svg";
//}
//}
//function changeWeatherIcon(response) {
//if (response.data.weather[0].main == "Rain") {
//weatherIcon.src = "src/svg/rain.svg";
//} else if (response.data.weather[0].description == "broken clouds") {
//weatherIcon.src = "src/svg/cloudy.svg";
//} else if (response.data.weather[0].main == "Drizzle") {
//weatherIcon.src = "src/svg/cloudy-day-1.svg";
//} else if (response.data.weather[0].main == "Snow") {
//weatherIcon.src = "src/svg/rainy-1.svg";
//} else if (response.data.weather[0].main == "Clear") {
// weatherIcon.src = "src/svg/snowy-2.svg";
//} else if (response.data.weather[0].main == "Thunderstorm") {
//weatherIcon.src = "src/svg/sunny-day.svg";
//} else if (response.data.weather[0].description == "few clouds") {
//weatherIcon.src = "src/svg/thunder.svg";
//} else if (response.data.weather[0].description == "freezing rain") {
//weatherIcon.src = "src/svg/cloudy-day-1.svg";
//} else if (response.data.weather[0].description == "scattered clouds") {
//weatherIcon.src = "src/svg/cloudy-day-3.svg";
//} else if (response.data.weather[0].description == "overcast clouds") {
//weatherIcon.src = "src/svg/cloudy-day-3.svg";
//} else if (response.data.weather[0].description == "light snow") {
//weatherIcon.src = "src/svg/snowy-1.svg";
//} else if (response.data.weather[0].description == "mist") {
//weatherIcon.src = "src/svg/fog.svg";
//} else if (response.data.weather[0].description == "light rain") {
//weatherIcon.src = "src/svg/rainy-1-day.svg";
//} else if (response.data.weather[0].description == "heavy snow") {
//weatherIcon.src = "src/svg/snowy-3.svg";
// }
//}
