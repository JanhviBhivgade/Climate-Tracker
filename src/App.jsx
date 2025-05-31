import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const apiKey = '7d3c9f4699ded7fa5d25cf5612c67cea';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

  


  const handleSearch = async () => {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      const data = await response.json();

      if (response.status === 404) {
        setError(true);
        setWeather(null);
      } else {
        setError(false);
        setWeather(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clouds':
        return './images/clouds.png';
      case 'Clear':
        return './images/clear.png';
      case 'Rain':
        return './images/rain.png';
      case 'Drizzle':
        return './images/drizzle.png';
      case 'Mist':
        return './images/mist.png';
      default:
        return './images/cloudds.png';
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative bg-cover bg-center" style={{ backgroundImage: `url("./images/img.jpg")` }}>
      <div className="content max-w-lg mx-auto py-8 mt-2 px-6 items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg text-white">
        <h1 className="text-4xl font-bold mb-6">Climate Tracker</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow py-2 px-4 rounded-l-lg bg-gray-700 text-white focus:outline-none"
          />
          <button onClick={handleSearch} className="py-2 px-4 rounded-r-lg bg-gray-700 hover:bg-gray-600 focus:outline-none">
            <img src="./images/search.png" alt="Search" className="w-6 h-6" />
          </button>
        </div>
        {error && (
          <div className="bg-red-500 rounded-md p-2 mb-4">
            <p>Invalid city name</p>
          </div>
        )}
        {weather && (
          <div>
            <img src={getWeatherIcon(weather.weather[0].main)} alt="Weather Icon" className="w-40 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-2">{Math.round(weather.main.temp)}°C</h2>
            <p className="text-2xl mb-6">{weather.name}</p>
            <div className="flex justify-between">
              <div className="flex items-center">
                <img src="./images/humidity.png" alt="Humidity" className="w-6 h-6 mr-2" />
                <p className="text-lg">{weather.main.humidity}%</p>
                <p className="ml-2">Humidity</p>
              </div>
      
              <div className="flex items-center">&nbsp;&nbsp;
                <img src="./images/wind.png" alt="Wind Speed" className="w-6 h-6 mr-2" />
                <p className="text-lg">{weather.wind.speed} km/h</p>
                <p className="ml-2">Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;