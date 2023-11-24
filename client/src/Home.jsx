import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey = 'f024fc3e6c4533d76d2b2af2aa9f4138';

  const location = useLocation();
  const user = location.state.user; // Access user information from location state

  useEffect(() => {
    // Fetch weather data when the component mounts
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${user.city}&units=imperial&appid=${apiKey}`)
      .then(response => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }, [user.city, apiKey]);

 

  return (
    <div>
      <h2>Welcome, {user.name}! Here are your outfits of the day! </h2>
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        weather && (
          <div>
            <h3>Weather in {user.city}</h3>
            <p>Temperature: {(weather.main.temp)}°F</p>
            <p>Today's weather is {weather.weather[0].description}!</p>
            {/* Add more weather information as needed */}
          </div>
        )
      )}
    </div>
  );
}

export default Home;
