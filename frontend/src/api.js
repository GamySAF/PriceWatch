// src/api.js
import axios from "axios";

const API = axios.create({
  // baseURL: "https://pricewatch-4n3q.onrender.com",
 baseURL: "https://pricewatch-4n3q.onrender.com",
});

// This adds the token to EVERY request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;