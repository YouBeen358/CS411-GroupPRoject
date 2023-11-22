import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey = 'f024fc3e6c4533d76d2b2af2aa9f4138';
  const userCity = 'London'; // You can replace this with the user's city from the database

  useEffect(() => {
    // Fetch weather data when the component mounts
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}`)
      .then(response => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }, [userCity, apiKey]);

  return (
    <div>
      <h2>WELCOME, HERE ARE YOUR OUTFITS OF THE DAY</h2>
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        weather && (
          <div>
            <h3>Weather in {userCity}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Description: {weather.weather[0].description}</p>
            {/* Add more weather information as needed */}
          </div>
        )
      )}
    </div>
  );
}

export default Home;
