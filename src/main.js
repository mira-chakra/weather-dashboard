import { loadWeather } from "./weather.js";


/*
 First, I get all the HTML elements that I will need in JavaScript.
This way, I can access the city entered by the user and later inject 
the information from the API into the page.
*/

const form = document.querySelector("#search-form");

const cityInput =
  document.querySelector("#city-input");

const searchBtn =
  document.querySelector("#search-btn");

const status =
  document.querySelector("#status");

const weatherResult =
  document.querySelector("#weather-result");


const locationName =
  document.querySelector("#location-name");

const weatherIcon =
  document.querySelector("#weather-icon");

const weatherDescription =
  document.querySelector("#weather-description");

const temperature =
  document.querySelector("#temperature");

const feelsLike =
  document.querySelector("#feels-like");

const humidity =
  document.querySelector("#humidity");

const windSpeed =
  document.querySelector("#wind-speed");

const dayNight =
  document.querySelector("#day-night");



/*
 This function displays the weather data on the page.
The data comes from the return value of the weather.js file,
 and is inserted into it's respective HTML elements.
*/

function displayWeather(data) {

  locationName.textContent =
    data.city + ", " + data.country;


  weatherIcon.textContent =
    data.icon;


  weatherDescription.textContent =
    data.description;


  /*
   I use Math.round() because the API may return a
    decimal value for the temperature,
   and I'd rather have a whole number.
  */

  temperature.textContent =
    Math.round(data.temperature) + "°C";


  feelsLike.textContent =
    Math.round(data.feelsLike) + "°C";


  humidity.textContent =
    data.humidity + "%";


  windSpeed.textContent =
    data.windSpeed + " km/h";


  /*
    The API gives isDay as 1 for day and 0 for night.
    I convert it into text so it is easier for the user to understand.
  */

  if (data.isDay === 1) {
    dayNight.textContent = "Day";
  } else {
    dayNight.textContent = "Night";
  }


  /*The weather section is initially hidden.
After getting the data, I will remove the hidden class
and display the data to the user.
  */

  weatherResult.classList.remove("hidden");
}



/*
  This function runs when the user searches for a city.
  It is async because getting data from an API takes some time,
  so I need to wait for the result before displaying it.
*/

async function searchWeather(event) {

  /*
    Normally, submitting a form will refresh the page. Using preventDefault() prevents the default behavior,
    allowing me to refresh the page with JavaScript
instead of the default behavior.
  */

  event.preventDefault();


  /*
    I get the city entered by the user.
    trim() removes spaces before and after the city name.
    For example: "  Beirut  " becomes "Beirut".
  */

  const city =
    cityInput.value.trim();


  /*
    Before sending a request, I check if the input is empty.
    If the user did not write a city, I show a message
    and stop the function using return.
  */

  if (city === "") {

    status.textContent =
      "Please enter a city name.";

    weatherResult.classList.add("hidden");

    return;
  }


  /*
    While waiting for the API, I show a loading message.
    I also disable the Search button so the user cannot
    send many requests at the same time.
  */

  status.textContent =
    "Loading weather...";

  searchBtn.disabled = true;


  /*
    I use try/catch because an API request may fail.
    loadWeather(city) is imported from weather.js.
    await waits until the weather data is received.
  */

  try {

    const data =
      await loadWeather(city);


    /*
      If the request succeeds, I send the returned data
      to displayWeather() to show it on the page.
    */

    displayWeather(data);


    status.textContent =
      "Weather loaded successfully.";

  }


  /*
    If there is an error, such as an invalid city
or failed network request, the catch block runs.
I hide the weather result and display the error message
instead of allowing the application to crash.
  */

  catch (error) {

    weatherResult.classList.add("hidden");

    status.textContent =
      error.message;

  }


  /*
    On completion of the request, I re-enable the Search button
so that it can be clicked again to search for another city.
  */

  searchBtn.disabled = false;
}



/*
  I listen for the form submission.
When the user clicks Search or presses Enter,
I call the function searchWeather()

*/

form.addEventListener(
  "submit",
  searchWeather
);