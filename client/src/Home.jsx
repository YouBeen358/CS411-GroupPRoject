import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Home() {
  const [weather, setWeather] = useState(null);
  const [outfitImage, setOutfitImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = 'f024fc3e6c4533d76d2b2af2aa9f4138';
  const searchKey = 'AIzaSyAxVT41lWbqfEPkFVdPK7qc7ZZYOFQWlv0';
  const searchEngineId = '5258205347cad49d4';

  const location = useLocation();
  const user = location.state.user;

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

  useEffect(() => {
    // Only make the Google Custom Search API request if both weather and user are available
    if (weather && user) {
      // Specify the site restriction to Google
      const siteRestriction = 'site:pinterest.com OR site:polyvore.com';
  
      // Modify the search query to include weather description, user's style, gender, and the term "outfit"
      const searchQuery = `${weather.weather[0].description} ${user.style} ${user.gender} fashion outfit ${siteRestriction}`;
  
      // Fetch images related to the updated search query from the Google Custom Search API
      axios.get(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&cx=${searchEngineId}&key=${searchKey}&searchType=image`)
        .then(response => {
          console.log('Google API response:', response.data);
  
          if (response.data.items && response.data.items.length > 0) {
            // Randomly select an image from the response
            const randomIndex = Math.floor(Math.random() * response.data.items.length);
            const imageLink = response.data.items[randomIndex].link;
            console.log('Image link:', imageLink);
            setOutfitImage(imageLink);
          } else {
            console.error('No items found in the API response.');
          }
        })
        .catch(error => {
          console.error('Error fetching outfit image:', error);
        });
    }
  }, [user, weather, searchEngineId, searchKey]);
  

  return (
    <div>
      <h2>Welcome, {user.name}! Here are your outfits of the day!</h2>
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        <div>
          <h3>Weather in {user.city}</h3>
          <p>Temperature: {weather && weather.main.temp}°F</p>
          <p>Today's weather is {weather && weather.weather[0].description}!</p>

          {/* Display the outfit image if available */}
          {outfitImage && (
            <div>
              <h3>{user.style} Outfit Inspiration</h3>
              <img src={outfitImage} alt={`${user.style} Outfit`} style={{ maxWidth: '50%' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
