import { ApiSuccess } from "common";
export type RoleName = "USER" | "ADMIN" | "VENDOR";
export type AuthUserResponseDto = ApiSuccess<"user", AuthUserDto>;
export type AuthUserDto = {
    id: string;
    phone: string;
    firstName: string | null;
    lastName: string | null;
    role: {
        id: string;
        name: RoleName;
    };
    email: string | null;
    dob: Date | null;
    isProfileComplete: boolean;
    lastLogin: Date | null;
}