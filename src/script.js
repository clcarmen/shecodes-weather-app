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
  if (hours < 10) {
    displayTime.innerHTML = `0${hours}:${minutes}`;
  } else {
    displayTime.innerHTML = `${hours}:${minutes}`;
  }
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
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
  document
    .querySelector(".today-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  celsiusTemperature = response.data.main.temp;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  console.log(forecast);

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
        <h6 class="time-one"> 
        ${formatHours(forecast.dt * 1000)}
         </h6>
          <p class="temperature-one">
              ${Math.round(forecast.main.temp)}°
          </p>
      <div class="icon-one">
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" width="50" height="50">
      </div>
    </div>`;
  }
}

function searchCity(cityName) {
  let apiKey = "0a561c8d68226540a6b14e63372df38b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function submitCity(event) {
  event.preventDefault();

  let cityName = document.querySelector("#search-city-input").value;
  searchCity(cityName);
}

let city = document.querySelector(".city-form");
city.addEventListener("submit", submitCity);

// BONUS - CHANGE FROM CELSIUS TO FAHRENHEIT

function unitF(event) {
  let displayTempF = document.querySelector(".city-temperature");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  displayTempF.innerHTML = `${fahrenheitTemp}`;

  changeUnitF.classList.add("active");
  changeUnitC.classList.remove("active");
}

let changeUnitF = document.querySelector(".fahrenheit");
changeUnitF.addEventListener("click", unitF);

function unitC(event) {
  let displayTempC = document.querySelector(".city-temperature");
  displayTempC.innerHTML = Math.round(celsiusTemperature);

  changeUnitF.classList.remove("active");
  changeUnitC.classList.add("active");
}

let changeUnitC = document.querySelector(".celsius");
changeUnitC.addEventListener("click", unitC);

let celsiusTemperature = null;

// search has to be after unit change

searchCity("Ottawa");

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
