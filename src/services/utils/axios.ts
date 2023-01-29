import axios from "axios";

const instance = axios.create({
  baseURL: "https://63d27f041780fd6ab9c61fbd.mockapi.io",
});

export default instance;
