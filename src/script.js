// DISPLAY CURRENT DATE

let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let date = now.getDate();

let year = now.getFullYear();

let displayDate = document.querySelector(".today-date");
displayDate.innerHTML = `${day} ${month} ${date}, ${year}`;

// DISPLAY CURRENT TIME

let hours = now.getHours();
let minutes = now.getMinutes();

function displayTimeFunction() {
  let displayTime = document.querySelector(".today-time");
  if (minutes < 10) {
    displayTime.innerHTML = `${hours}:0${minutes}`;
  } else {
    displayTime.innerHTML = `${hours}:${minutes}`;
  }
}

displayTimeFunction();

// DISPLAY CITY NAME AND TEMP AFTER SEARCH

function displayWeatherCondition(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".city-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  console.log(response.data);
  document.querySelector(".feels-like-temperature").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;
  document.querySelector(".today-forecast").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity-value").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
}

function searchCity(cityName) {
  let apiKey = "0a561c8d68226540a6b14e63372df38b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function submitCity(event) {
  event.preventDefault();

  let cityName = document.querySelector("#search-city-input").value;
  searchCity(cityName);
}

let city = document.querySelector(".city-form");
city.addEventListener("submit", submitCity);

searchCity("Ottawa");

// BONUS - CHANGE FROM CELSIUS TO FAHRENHEIT

function unitF(event) {
  let displayTempF = document.querySelector(".city-temperature");
  displayTempF.innerHTML = `66`;
}

let changeUnitF = document.querySelector(".fahrenheit");
changeUnitF.addEventListener("click", unitF);

function unitC(event) {
  let displayTempC = document.querySelector(".city-temperature");
  displayTempC.innerHTML = `17`;
}

let changeUnitC = document.querySelector(".celsius");
changeUnitC.addEventListener("click", unitC);

// BONUS - GEOLOCATION

function searchLocation(position) {
  let apiKey = "0a561c8d68226540a6b14e63372df38b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function getCurrentLocation(position) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
