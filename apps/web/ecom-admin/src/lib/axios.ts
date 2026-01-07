import axios, { type AxiosError } from "axios";
import { conf } from "@/config/config";
import type { ApiError } from "common";
import { cookieStorage } from "./cookieStorage";
// Axios instance with common configurations (base URL, headers, etc.)
const axiosInstance = axios.create({
    baseURL: conf.server_url + "/v1", // Add your base URL here
    timeout: 60 * 1000, // 60 seconds timeout
    withCredentials: true,
});
// request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = cookieStorage.getItem("csrf_token");
        if (token) {
            config.headers["x-csrf-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Intercepting responses to handle common error logic
axiosInstance.interceptors.response.use(
    (response) => {
        // You can perform any common response logic here
        return response;
    },
    (error: AxiosError<ApiError>) => {
        const { response } = error;
        const err = {
            message: response?.data.message || "An unexpected error occurred",
            errors: response?.data.errors,
        } satisfies ApiError;

        return Promise.reject(err);
    },
);


export default axiosInstance;
