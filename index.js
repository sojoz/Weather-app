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
  "Saturday"
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
  "Dec"
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

function showTemperature(response) {
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  let button1 = document.querySelector("#mainTemperature");
  let tempDescription = response.data.weather[0].description;
  let windSpeed1 = Math.round(response.data.wind.speed);
  let humdity1 = response.data.main.humidity;
  h2.innerHTML = response.data.name;
  button1.innerHTML = `${temperature}°C`;
  weatherText.innerHTML = `${tempDescription}`;
  windSpeed.innerHTML = `Wind: ${windSpeed1} m/h`;
  humidity.innerHTML = `Humidity: ${humdity1}%`;
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
