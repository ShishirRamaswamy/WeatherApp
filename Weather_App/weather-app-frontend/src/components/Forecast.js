import React from 'react';
import { Card } from 'react-bootstrap';

const Forecast = ({ forecastData }) => {
  const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0);

  return (
    <Card className="forecast-card mb-4">
      <Card.Body>
        <Card.Title className="mb-4">5-Day Forecast</Card.Title>
        <div className="d-flex flex-wrap justify-content-between">
          {dailyForecast.slice(0, 5).map((day) => (
            <div key={day.dt} className="forecast-item">
              <h5>
                {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </h5>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="mb-2"
                style={{ width: '50px' }}
              />
              <p>{Math.round(day.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Forecast;