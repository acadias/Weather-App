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
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#write-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
  let apiKey = "d0e932fc6acbbe94467003adf5e15de0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentTemperature);
}
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
function showCurrentTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("h4");
  let h1 = document.querySelector("h1");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement = response.data.main.humidity;
  h1.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);

  let weatherSituation = response.data.weather[0].description;
  if (weatherSituation === "Clear") {
    document.querySelector("#in").setAttribute("src", "img/clear.gif");
    document.querySelector("#background").classList.add("containerclearSky");
    document
      .querySelector("#background")
      .classList.remove(
        "containerfewClouds",
        "containerscatteredClouds",
        "containerbrokenClouds",
        "containershowerRain",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containerThunderstorm"
      );
  }
  if (weatherSituation === "Few Clouds") {
    document.querySelector("#in").setAttribute("src", "img/fewclouds.gif");
    document.querySelector("#background").classList.add("containerfewClouds");
    document
      .querySelector("#background")
      .classList.remove(
        "containerscatteredClouds",
        "containerclearSky",
        "containerbrokenClouds",
        "containershowerRain",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containerThunderstorm"
      );
  }
  if (weatherSituation === "Scattered Clouds") {
    document
      .querySelector("#in")
      .setAttribute("src", "img/scatteredclouds.gif");
    document
      .querySelector("#background")
      .classList.add("containerscatteredClouds");
    document
      .querySelector("#background")
      .classList.remove(
        "containerfewClouds",
        "containerclearSky",
        "containerbrokenClouds",
        "containershowerRain",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containerThunderstorm"
      );
  }

  if (weatherSituation === "Broken Clouds") {
    document.querySelector("#in").setAttribute("src", "img/brokenclouds.gif");
    document
      .querySelector("#background")
      .classList.add("containerbrokenClouds");
    document
      .querySelector("#background")
      .classList.remove(
        "containerfewClouds",
        "containerscatteredClouds",
        "containerclearSky",
        "containershowerRain",
        "containerRain",
        "containerMist",
        "containerSnow",
        "containerThunderstorm"
      );
  }

  if (weatherSituation === "Rain") {
    document.querySelector("in").setAttribute("src", "img/rain.gif");
    document.querySelector("#background").classList.add("containerRain");
    document
      .querySelector("#background")
      .classList.remove(
        "containerfewClouds",
        "containerscatteredClouds",
        "containerclearSky",
        "containerbrokenClouds",
        "containershowerRain",
        "containerMist",
        "containerSnow",
        "containerThunderstorm"
      );
  }
  if (weatherSituation === "Mist") {
    document.querySelector("#in").setAttribute("src", "img/mist.gif");
    document.querySelector("#background").classList.add("containerMist");
    document
      .querySelector("#background")
      .classList.remove(
        "containerfewClouds",
        "containerscatteredClouds",
        "containerclearSky",
        "containerbrokenClouds",
        "containershowerRain",
        "containerRain",
        "containerSnow",
        "containerThunderstorm"
      );
  }
  if (weatherSituation === "Snow") {
    document.querySelector("#in").setAttribute("src", "img/snow.gif");
    document.querySelector("#background").classList.add("containerSnow");
    document
      .querySelector("#background")
      .classList.remove(
        "containerfewClouds",
        "containerscatteredClouds",
        "containerclearSky",
        "containerbrokenClouds",
        "containershowerRain",
        "containerRain",
        "containerMist",
        "containerThunderstorm"
      );
  }
  if (weatherSituation === "Thunderstorm") {
    document.querySelector("#in").setAttribute("src", "img/thunderstorm.gif");
    document
      .querySelector("#background")
      .classList.add("containerThunderstorm");
    document
      .querySelector("#background")
      .classList.remove(
        "containerfewClouds",
        "containerscatteredClouds",
        "containerclearSky",
        "containerbrokenClouds",
        "containershowerRain",
        "containerRain",
        "containerMist",
        "containerSnow"
      );
  }

  if (weatherSituation === "Shower Rain") {
    document.querySelector("#in").setAttribute("src", "img/showerain.gif");
    document.querySelector("#background").classList.add("containershowerRain");
    document
      .querySelector("#background")
      .classList.remove(
        "containerfewClouds",
        "containerscatteredClouds",
        "containerclearSky",
        "containerbrokenClouds",
        "containerThunderstorm",
        "containerRain",
        "containerMist",
        "containerSnow"
      );
  }

  document.querySelector("#now").innerHTML = weatherSituation.toUpperCase();
}

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

form.addEventListener("submit", search);
