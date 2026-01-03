import axios from "axios";
import type { AxiosError } from "axios";
import type { ApiError } from "global"
import { loadConfig } from "./config.js";

export function api() {
    const { baseUrl, apiKey } = loadConfig();

    const client = axios.create({
        baseURL: baseUrl,
        headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
    });

    client.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ApiError>) => {
            console.log(error);

            const { response } = error;
            const err: ApiError & {
                status: number;
            } = {
                status: response?.status || 500,
                message: response?.data?.message || "Internal server error",
            };

            if (response?.data.extraDetails) {
                err.extraDetails = response.data.extraDetails;
            }

            if (response?.data.errors) err.errors = response.data.errors;

            console.error(err);
            process.exit(1);
        },
    );
    return client;
}
