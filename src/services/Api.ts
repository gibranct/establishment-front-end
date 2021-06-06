import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_FLEXUC_URL || 'http://127.0.0.1:4000/api'
});

export default api;
