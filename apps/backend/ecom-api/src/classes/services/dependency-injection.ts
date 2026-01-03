import { prisma } from "@database/prisma-ecom";

// leaf services
import { TokenService } from "./token-service.js";
import { RefreshToken } from "./refreshToken-service.js";
import { RoleService } from "./role-service.js";
import { UserService } from "./user-service.js";
import { AddressSerivce } from "./address-service.js";
import { CommonAddressService } from "./common-address-service.js";
import { ProductService } from "./product-service.js";
import { NodeService } from "./node-service.js";
import { VariantService } from "./variant-service.js";
import { Media } from "@utils/api";
import { AdvertiseService } from "./advertise-service.js";
// composite services
import { AuthService } from "./auth-service.js";
import { OtpService } from "./otp-service.js";
import { CookieService } from "./cookie-service.js";
import { generalLogger } from "@/utils/logger.js";

export const otpService = new OtpService();
export const mediaService = new Media(generalLogger);
export const nodeService = new NodeService(prisma);
export const variantService = new VariantService(prisma, nodeService);
export const commonAddressService = new CommonAddressService(prisma);
export const tokenService = new TokenService();
export const cookieService = new CookieService();
export const roleService = new RoleService(prisma);
export const refreshTokenService = new RefreshToken(prisma);
export const userService = new UserService(prisma, roleService);
export const addressService = new AddressSerivce(prisma, commonAddressService);
export const advertiseService = new AdvertiseService(prisma);
export const authService = new AuthService(
    tokenService,
    userService,
    refreshTokenService,
);
export const productService = new ProductService(
    prisma,
    nodeService,
    variantService,
);