import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, Wind, Thermometer, AlertTriangle, MapPin } from 'lucide-react';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Replace this with your actual OpenWeather API key
  const API_KEY = process.env.REACT_APP_Weather_API_KEY;

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const getWeather = () => {
      // First get user's location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Make API call to OpenWeather
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
            );
            
            if (!response.ok) {
              throw new Error('Weather data fetch failed');
            }
            
            const data = await response.json();
            console.log('Weather data:', data); // Debug log
            setWeatherData(data);
            setLoading(false);
          } catch (err) {
            console.error('Error fetching weather:', err); // Debug log
            setError(err.message);
            setLoading(false);
          }
        },
        (err) => {
          console.error('Geolocation error:', err); // Debug log
          setError('Failed to get location. Please enable location services.');
          setLoading(false);
        }
      );
    };

    getWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(getWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#8B4513] border-t-transparent"></div>
          <span className="text-[#8B4513]">Loading weather data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-red-500">
            <AlertTriangle className="h-5 w-5" />
            <p>{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#2C1810] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#2C1810]">
          {currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })}
        </h2>
        {weatherData && (
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-[#8B4513]" />
            <span className="text-sm text-[#8B4513]">
              {weatherData.name}, {weatherData.sys?.country}
            </span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-[#FAF6F1] rounded-lg">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-[#8B4513]" />
            <span className="text-sm text-[#8B4513]">Temperature</span>
          </div>
          <p className="text-xl font-bold text-[#2C1810] mt-2">
            {Math.round(weatherData.main?.temp)}°C
          </p>
        </div>
        
        <div className="p-4 bg-[#FAF6F1] rounded-lg">
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-[#8B4513]" />
            <span className="text-sm text-[#8B4513]">Wind</span>
          </div>
          <p className="text-xl font-bold text-[#2C1810] mt-2">
            {Math.round((weatherData.wind?.speed || 0) * 3.6)} km/h
          </p>
        </div>
        
        <div className="p-4 bg-[#FAF6F1] rounded-lg">
          <div className="flex items-center space-x-2">
            <CloudRain className="h-5 w-5 text-[#8B4513]" />
            <span className="text-sm text-[#8B4513]">Humidity</span>
          </div>
          <p className="text-xl font-bold text-[#2C1810] mt-2">
            {weatherData.main?.humidity}%
          </p>
        </div>
        
        <div className="p-4 bg-[#FAF6F1] rounded-lg">
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-[#8B4513]" />
            <span className="text-sm text-[#8B4513]">Feels Like</span>
          </div>
          <p className="text-xl font-bold text-[#2C1810] mt-2">
            {Math.round(weatherData.main?.feels_like)}°C
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;