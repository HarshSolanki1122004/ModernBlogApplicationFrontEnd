import axios from "axios";

const APII = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

APII.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default APII;
