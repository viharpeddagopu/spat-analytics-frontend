import axios from "axios";

const api = axios.create({
  baseURL: "https://spat-analytics-backend-1.onrender.com/api"
});

export default api;
