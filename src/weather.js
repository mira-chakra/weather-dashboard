/*
  use two Open-Meteo APIs.
One is used to find city coordinates, 
another is used to get the weather by the founded coordinates.
*/

const GEO_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast";



/*
  The function makes an API call to the server.
I check if response.ok is true, and then convert 
the response to JSON.

*/

async function getJSON(url) {

  const response =
    await fetch(url);


  if (!response.ok) {

    throw new Error(
      "Could not load weather."
    );

  }


  const data =
    await response.json();


  return data;
}



/*
  Open-Meteo provides the weather condition as a number
I will then interpret this by putting it into a simple description
and an icon to put on the page.
*/

function getWeatherInfo(code) {

  if (code === 0) {

    return {
      description: "Clear Sky",
      icon: "☀️"
    };

  }


  if (
    code === 1 ||
    code === 2
  ) {

    return {
      description: "Partly Cloudy",
      icon: "⛅"
    };

  }


  if (code === 3) {

    return {
      description: "Cloudy",
      icon: "☁️"
    };

  }


  if (
    code === 45 ||
    code === 48
  ) {

    return {
      description: "Fog",
      icon: "🌫️"
    };

  }


  if (
    code >= 51 &&
    code <= 67
  ) {

    return {
      description: "Rain",
      icon: "🌧️"
    };

  }


  if (
    code >= 71 &&
    code <= 77
  ) {

    return {
      description: "Snow",
      icon: "❄️"
    };

  }


  if (
    code >= 80 &&
    code <= 82
  ) {

    return {
      description: "Rain Showers",
      icon: "🌧️"
    };

  }


  if (code >= 95) {

    return {
      description: "Thunderstorm",
      icon: "⛈️"
    };

  }


  return {
    description: "Weather",
    icon: "🌤️"
  };
}



/*
This is the main function used to get the weather.
Firstly, a query is run to find the city in order to get its latitude
and longitude, then with these we can get the current weather.
*/

export async function loadWeather(city) {


  /*
    I send the city name to the Geocoding API.
  */

  const geoParams =
    new URLSearchParams();


  geoParams.append(
    "name",
    city
  );


  geoParams.append(
    "count",
    "1"
  );


  const geoURL =
    GEO_URL +
    "?" +
    geoParams.toString();


  const geoData =
    await getJSON(geoURL);



  /*
    If no city is returned, I show an error.
  */

  if (
    !geoData.results ||
    geoData.results.length === 0
  ) {

    throw new Error(
      "City not found. Please try again."
    );

  }



  /*
    I take the first result and save
    its latitude and longitude.
  */

  const place =
    geoData.results[0];


  const latitude =
    place.latitude;


  const longitude =
    place.longitude;



  /*
    Now I prepare the request for the weather API
    using the coordinates of the selected city.
  */

  const weatherParams =
    new URLSearchParams();


  weatherParams.append(
    "latitude",
    latitude
  );


  weatherParams.append(
    "longitude",
    longitude
  );


  /*
    These are the weather values I want
    to display in my dashboard.
  */

  weatherParams.append(
    "current",
    "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,is_day,wind_speed_10m"
  );


  weatherParams.append(
    "timezone",
    "auto"
  );



  const weatherURL =
    WEATHER_URL +
    "?" +
    weatherParams.toString();



  /*
    I send the weather request and get the result.
  */

  const weatherData =
    await getJSON(weatherURL);


  const current =
    weatherData.current;



  /*
    I convert the weather code into
    a description and an icon.
  */

  const weatherInfo =
    getWeatherInfo(
      current.weather_code
    );



  /*
    I return only the information
    that I need in main.js.
  */

  return {

    city:
      place.name,

    country:
      place.country,

    temperature:
      current.temperature_2m,

    feelsLike:
      current.apparent_temperature,

    humidity:
      current.relative_humidity_2m,

    windSpeed:
      current.wind_speed_10m,

    isDay:
      current.is_day,

    description:
      weatherInfo.description,

    icon:
      weatherInfo.icon

  };

}