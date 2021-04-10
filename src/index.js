//-------TIME AND DATE----------//

function currentDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = days[now.getDay()];
  let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let now = new Date();
let h2 = document.querySelector("#date-month-year");
let h5 = document.querySelector("#time");
h2.innerHTML = currentDate(now);
h5.innerHTML = formatHours(now);
function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[date.getDay()];
}

//--------------------------------------------------------//

//-------CITY SEARCH----------//

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#write-city");
  let apiKey = "d0e932fc6acbbe94467003adf5e15de0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentTemperature);
}

//--------------------------------------------------------//

//-------DISPLAY FORECAST----------//

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <strong class= weather-forecast-date>${formatDay(
            forecastDay.dt * 1000
          )}</strong><br />
          <img class="weekdays-icon" src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
          <div class="row row-cols-1">
            <div class="col" class= weather-forecast-temperature-min>${Math.round(
              forecastDay.temp.max
            )} C°</div>  
 <div class="col" class= weather-forecast-temperature-max>${Math.round(
   forecastDay.temp.min
 )} C°</div>
          </div>
          </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "d0e932fc6acbbe94467003adf5e15de0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
//--------------------------------------------------------//

//------CHANGE CITY AND TEMPERATURE----------//
// -->Displays weather, humidity, wind, icon, backgrounds etc.

function showCurrentTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#hum");
  let descriptionElement = document.querySelector("h4");
  let h1 = document.querySelector("h1");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  h1.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);

  let weatherSituation = response.data.weather[0].main;
  if (weatherSituation === "Clear") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/clear.gif')";
    document.querySelector("#background").classList.add("containerclearSky");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerDrizzle",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containerThunderstorm",
        "containersandDust",
        "containerTornado",
        "containerashSmoke",
        "containerNull"
      );
  } else if (weatherSituation === "Clouds") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/brokenclouds.gif')";
    document.querySelector("#background").classList.add("containerClouds");
    document
      .querySelector("#background")
      .classList.remove(
        "containerclearSky",
        "containerDrizzle",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containerThunderstorm",
        "containersandDust",
        "containerTornado",
        "containerashSmoke",
        "containerSquall",
        "containerNull"
      );
  } else if (weatherSituation === "Rain") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/rain.gif')";
    document.querySelector("#background").classList.add("containerRain");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerclearSky",
        "containerDrizzle",
        "containerMist",
        "containerSnow",
        "containerThunderstorm",
        "containersandDust",
        "containerTornado",
        "containerashSmoke",
        "containerSquall",
        "containerNull"
      );
  } else if (
    weatherSituation === "Mist" ||
    weatherSituation === "Fog" ||
    weatherSituation === "Haze"
  ) {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/mist.gif')";
    document.querySelector("#background").classList.add("containerMist");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerclearSky",
        "containerDrizzle",
        "containerRain",
        "containerSnow",
        "containerThunderstorm",
        "containersandDust",
        "containerTornado",
        "containerashSmoke",
        "containerSquall",
        "containerNull"
      );
  } else if (weatherSituation === "Snow") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/snow.gif')";
    document.querySelector("#background").classList.add("containerSnow");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerclearSky",
        "containerDrizzle",
        "containerRain",
        "containerMist",
        "containerThunderstorm",
        "containersandDust",
        "containerTornado",
        "containerashSmoke",
        "containerSquall",
        "containerNull"
      );
  } else if (weatherSituation === "Thunderstorm") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/thunderstorm.gif')";
    document
      .querySelector("#background")
      .classList.add("containerThunderstorm");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerclearSky",
        "containerDrizzle",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containersandDust",
        "containerTornado",
        "containerashSmoke",
        "containerSquall",
        "containerNull"
      );
  } else if (weatherSituation === "Drizzle") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/showerain.gif')";
    document.querySelector("#background").classList.add("containerDrizzle");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerclearSky",
        "containerThunderstorm",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containersandDust",
        "containerTornado",
        "containerashSmoke",
        "containerSquall",
        "containerNull"
      );
  } else if (weatherSituation === "Sand" || weatherSituation === "Dust") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/showerain.gif')";
    document.querySelector("#background").classList.add("containersandDust");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerclearSky",
        "containerThunderstorm",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containerTornado",
        "containerashSmoke",
        "containerSquall",
        "containerNull"
      );
  } else if (weatherSituation === "Tornado") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/tornado.gif')";
    document.querySelector("#background").classList.add("containerTornado");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerclearSky",
        "containerThunderstorm",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containersandDust",
        "containerashSmoke",
        "containerSquall",
        "containerNull"
      );
  } else if (weatherSituation === "Ash" || weatherSituation === "Smoke") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/smoke.gif')";
    document.querySelector("#background").classList.add("containerashSmoke");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerclearSky",
        "containerThunderstorm",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containersandDust",
        "containerTornado",
        "containerSquall",
        "containerNull"
      );
  } else if (weatherSituation === "Squall") {
    document.querySelector("#in").style.backgroundImage =
      "url('./src/img/squall.gif')";
    document.querySelector("#background").classList.add("containerSquall");
    document
      .querySelector("#background")
      .classList.remove(
        "containerClouds",
        "containerclearSky",
        "containerThunderstorm",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containersandDust",
        "containerTornado",
        "containerashSmoke",
        "containerNull"
      );
  }
}

//--------------------------------------------------------//

// --- CURRENT LOCATION ---------//

function retrievePosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d0e932fc6acbbe94467003adf5e15de0";
  let units = "metric";
  let apiLatUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiLatUrl).then(showCurrentTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//--------------------------------------------------------//

//-----UNIT CONVERSION-----//

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getPosition);
let form = document.querySelector("#search-form");
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//--------------------------------------------------------//

form.addEventListener("submit", search);
