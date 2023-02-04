import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://f01d-2401-4900-1c5e-9bc5-976-8601-729a-4da2.ngrok.io',
});

export default instance;
