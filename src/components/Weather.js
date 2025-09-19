import React, { useState } from 'react';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const apiKey = '614d681fe5906987f28e76e348a9160f'; // Replace with your actual API key

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const fetchWeather = async () => {
        if (city === "") {
            setError("Please enter a city name!");
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();

            if (data.cod !== 200) {
                setError("City not found!");
                setWeatherData(null);
            } else {
                setWeatherData(data);
                setError('');
            }
        } catch (error) {
            setError('Error fetching weather data!');
            setWeatherData(null);
        }

        setLoading(false);
    };

    return (
        <div className="weather-container">
            <h1>Weather Forecast</h1>
            
            <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city"
            />
            <button onClick={fetchWeather} disabled={loading}>
                {loading ? 'Loading...' : 'Get Weather'}
            </button>

            {error && <div className="error">{error}</div>}

            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <div>Temperature: {weatherData.main.temp} °C</div>
                    <div>Description: {weatherData.weather[0].description}</div>
                    <div>Humidity: {weatherData.main.humidity}%</div>
                    <div>Wind Speed: {weatherData.wind.speed} m/s</div>
                </div>
            )}
        </div>
    );
};

export default Weather;
