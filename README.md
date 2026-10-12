# Weather Dashboard

This project is a weather dashboard made with HTML, CSS and JavaScript.
The user can search for a city name to display the current weather.

## Features

The application displays:
- Temperature
- Weather state
- Weather icon
- Feels like temperature
- Humidity
- Wind speed
- Day or night
The application also displays:
- A loading text while waiting for the API response
- An error text if the city is not found or if the API request fails
- A responsive design for desktops and mobile devices

## API

This project uses the Open-Meteo public API.
Open-Meteo does not require an API key, so there is no need to register or set up an API key.
This project uses two Open-Meteo APIs:
1. Geocoding API:
The geocoding API is used to convert the city name that the user searches into latitude and longitude.
2. Forecast API:
The forecast API is used to get the current weather information with the latitude and longitude.

## How to run

1. Open the project folder in VS Code.
2. Install the dependencies:
npm install
3. Start the project:
npm run dev
4. Open the localhost link shown in the terminal.
5. Search for a city name and click Search.

## API key

This project does not need an API key because Open-Meteo provides a public API.
The .gitignore file has .env so that if you add API keys or other private information in the future, it will not be uploaded to GitHub.
