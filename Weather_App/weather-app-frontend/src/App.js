import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import FavoritesList from './components/FavoritesList';
import ErrorMessage from './components/ErrorMessage';
import { getWeather, getForecast } from './services/weatherService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather and forecast data
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const [weather, forecast] = await Promise.all([
        getWeather(cityName),
        getForecast(cityName),
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
      
      // Update body background based on day/night 
      if (weather?.weather?.[0]?.icon) {
        const isDayTime = weather.weather[0].icon.includes('d');
        document.body.style.background = isDayTime
          ? 'linear-gradient(135deg, #6e8efb, #a777e3)'
          : 'linear-gradient(135deg, #1e276b, #4c3575)';
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add city to favorites
  const addFavorite = (city) => {
    if (!favorites.some((fav) => fav.cityName === city.cityName)) {
      setFavorites([...favorites, city]);
    }
  };

  // Remove city from favorites
  const removeFavorite = (cityName) => {
    setFavorites(favorites.filter((fav) => fav.cityName !== cityName));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h1 className="mb-4">Weather Dashboard</h1>
          <SearchBar
            onSearch={fetchWeatherData}
            city={city}
            setCity={setCity}
          />
          {loading && <Spinner animation="border" className="mt-3" />}
          {error && <ErrorMessage message={error} />}
          {weatherData && (
            <>
              <WeatherCard
                weatherData={weatherData}
                onAddFavorite={addFavorite}
              />
              <Forecast forecastData={forecastData} />
            </>
          )}
        </Col>
        <Col md={4}>
          <FavoritesList
            favorites={favorites}
            onRemoveFavorite={removeFavorite}
            onSelectFavorite={(city) => {
              setCity(city.cityName);
              fetchWeatherData(city.cityName);
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;