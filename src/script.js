function formatDayTime(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2" class id="forecast-day">
      <div class="forecast-date">${formatDay(forecastDay.time)}</div>
  
      <img src=${forecastDay.condition.icon_url} alt="" width="36" />
      <div class="forecast-temps">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temperature.maximum
        )}°</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>`;
    }
    forecastElement.innerHTML = forecastHTML;
  });
  forecastHTML = forecastHTML + `</div>`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dateNo = date.getDate();
  let months = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return `${dateNo} ${month} ${year}`;
}

function getForecast(coordinates) {
  let apiKey = "a53b648o522cd05fa66cde020a59ta02";
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#strong-temp");
  let conditionsElement = document.querySelector("#conditions");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dayElement = document.querySelector("#dayTime");
  let dateElement = document.querySelector("#date");
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#icon");

  celciusTemp = Math.round(response.data.temperature.current);

  temperatureElement.innerHTML = celciusTemp;
  conditionsElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dayElement.innerHTML = formatDayTime(response.data.time * 1000);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  cityElement.innerHTML = response.data.city;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);
}

function showCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#strong-temp");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  //add active class from celcius link
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#strong-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function search(city) {
  let apiKey = "a53b648o522cd05fa66cde020a59ta02";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

search("Liverpool");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#farenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);
