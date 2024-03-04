const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const weatherIcon = document.querySelector("#weatherIcon");
const windSpeed = document.querySelector("#windSpeed");
const humidity = document.querySelector(".humidity");
const weather = document.querySelector(".weather");
const desc = document.querySelector(".desc");
const API = "842f288c973c5a8f914d523eda72f132";

const setWeatherDetails = (data) => {
    desc.innerHTML = data.weather[0].description;
    weather.innerHTML = Math.round(data.main.temp - 273.15) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + "km/h";
    switch (data.weather[0].main) {
      case 'Clouds':
          weatherIcon.src = "c:/my certificates/my pro/assets/cloud.jpeg";
          break;
      case 'Clear':
          weatherIcon.src = "c:/my certificates/my pro/assets/clear.jpeg";
          break;
      case 'Rain':
          weatherIcon.src = "c:/my certificates/my pro/assets/rain.jpeg";
          break;
      case 'Mist':
          weatherIcon.src = "c:/my certificates/my pro/assets/mist.jpeg";
          break;
      case 'Snow':
          weatherIcon.src = "c:/my certificates/my pro/assets/snow.jpeg";
          break;
      case 'Haze':
          weatherIcon.src = "c:/Users/DELL/Downloads/haze.jpg";
          break;
      default:
          weatherIcon.src = ""; // Provide a default image source if none of the cases match
  }
};

const callAPI = (id) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${id}`)
        .then(response => {
            if (!response.ok) {
                alert("Check spelling of City and try again or Something Went Wrong!");
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setWeatherDetails(data);
        })
        .catch(error => console.log(error));
};

searchButton.addEventListener("click", (e) => {
    if (searchInput.value == "") {
        alert("Please Enter City Name.");
    } else {
        callAPI(API);
    }
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchButton.click();
    }
});

searchButton.click();
