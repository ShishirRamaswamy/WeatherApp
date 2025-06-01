// src/services/weatherService.js
import axios from 'axios';

const API_KEY = '0a5a84df6bb1f2ee91b491378ae8cc72'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });
  return response.data;
};

export const getForecast = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });
  return response.data;
};