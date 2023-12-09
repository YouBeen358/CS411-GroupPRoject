import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [outfit, setOutfit] = useState(null);
  const [loadingOutfit, setLoadingOutfit] = useState(true);


  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey = 'f024fc3e6c4533d76d2b2af2aa9f4138';
  const userCity = 'London'; // You can replace this with the user's city from the database

  const searchEngineId = 'AIzaSyAxq4eeoFiZ_cJSCh4w4T3lz77kHvv0oEo'

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

  useEffect(() => {
    if (weather) {
      // const query = `outfit for ${weather.main.temp}°F ${weather.weather[0].description}`;
      const query = `outfit for ${weather.main.temp}°F`;
      axios.get(`https://www.googleapis.com/customsearch/v1?key=${searchEngineId}&cx=017576662512468239146:omuauf_lfve&q=${query}`)
        .then(response => {
          console.log('Outfit data:', response.data)
          setOutfit(response.data || []);
          setLoadingOutfit(false);
        })
        .catch(error => {
          console.error('Error fetching outfit data:', error);
          setLoadingOutfit(false);
        });
    }
  }, [weather, searchEngineId]);


  return (
    <div>
      <h2>WELCOME, HERE ARE YOUR OUTFITS OF THE DAY</h2>
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        weather && (
          <div>
            <h3>Weather in {userCity}</h3>
            <p>Temperature: {weather.main.temp}°F</p>
            <p>Description: {weather.weather[0].description}</p>
            {/* Add more weather information as needed */}
          </div>
        )
      )}

      {loadingOutfit ? (
        <p>Loading outfit data...</p>
      ) : (
        outfit && outfit.items ? (
          <div>
            <h3>Outfit of the day</h3>
            <p>Here is your outfit for today!</p>
            <img src={outfit.items[0].link} alt={outfit.items[0].title} />
            <p>{outfit.items[0].title}</p>
            {/* Add more outfit information as needed */}
          </div>
        ) : (
          <p>No outfit found for the current weather</p>
        )
      )}
    </div >
  );
}

export default Home;
