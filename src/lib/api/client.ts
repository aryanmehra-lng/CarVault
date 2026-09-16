import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.cars-data.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.EXPO_PUBLIC_CAR_API_KEY,
  },
});