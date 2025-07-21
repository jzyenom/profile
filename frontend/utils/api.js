// src/utils/api.js

import axios from "axios";

// Dynamically set base API URL
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : `${import.meta.env.VITE_API_URL}/api/auth`;

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // important for cookies/auth
});

export default api;
