import axios from 'axios';

const api = axios.create({
  baseURL: process.env.JSON_SERVER_ULR,
});

export default api;
