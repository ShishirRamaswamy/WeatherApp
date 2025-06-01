import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const WeatherCard = ({ weatherData, onAddFavorite }) => {
  const { name, main, weather, wind, sys } = weatherData;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const isDayTime = weather[0].icon.includes('d');

  // Dynamic background based on day/night
  const cardStyle = {
    background: isDayTime 
      ? 'linear-gradient(135deg, rgba(110, 142, 251, 0.7), rgba(167, 119, 227, 0.7))'
      : 'linear-gradient(135deg, rgba(30, 39, 107, 0.7), rgba(76, 53, 117, 0.7))',
  };

  return (
    <Card className="weather-card mb-4" style={cardStyle}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span>
            {name}, {sys.country} 
            <small className="ms-2">{new Date().toLocaleDateString()}</small>
          </span>
          <Button 
            variant="primary"
            onClick={() => onAddFavorite({ cityName: name, country: sys.country, lat: weatherData.coord.lat, lon: weatherData.coord.lon })}
          >
            ♥ Add Favorite
          </Button>
        </Card.Title>
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <img src={weatherIcon} alt={weather[0].description} className="weather-icon" />
            <h3 className="text-capitalize">{weather[0].description}</h3>
          </Col>
          <Col md={8}>
            <div className="weather-details">
              <h1 className="display-3">{Math.round(main.temp)}°C</h1>
              <p>Feels Like: {Math.round(main.feels_like)}°C</p>
              <p>Humidity: {main.humidity}%</p>
              <p>Wind: {wind.speed} m/s</p>
              <p>Pressure: {main.pressure} hPa</p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;