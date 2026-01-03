import axios from "axios";
import { conf } from "../config/config";

// Axios instance with common configurations (base URL, headers, etc.)
const axiosInstance = axios.create({
  baseURL: "/api/v1", // Add your base URL here
  headers: {
    timeout: 5000, // 5 seconds timeout
    api_key: conf.api_key, // Add your API key here
  },
  withCredentials: true,
});

// Intercepting responses to handle common error logic
axiosInstance.interceptors.response.use(
  (response) => {
    // You can perform any common response logic here
    return response; // Returning the data part only (you can modify this)
  },
  (error) => {
    const { response } = error;
    const res = {
      status: response?.status || 500,
      message: response?.data?.message || "Internal server error",
      extraDetails: response?.data?.extraDetails || "Something went wrong",
    };

    console.error(res);
    return Promise.reject(res);
  },
);

export default axiosInstance;
