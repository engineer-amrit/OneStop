import type { Phone } from "@schema/ecom";
import axiosInstance from "@/lib/axios";
class UserService {
    async login(data: Phone, dispatch: () => void) {
        const response = await axiosInstance.post("/auth", data);
        dispatch();
        return response.data;
    }
}

export const userService = new UserService();