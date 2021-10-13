import axios from 'axios';

const api = axios.create({
  baseURL: 'https://plantmanager-db.herokuapp.com',
});

export default api;
