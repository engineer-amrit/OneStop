import type { RequestWithUser } from "./tokenVerifier-middleware.js";
import { block } from "@/classes/controllers/blockHandler.js";
import { CustomError } from "@utils/api";

export const adminAuth = block.createMiddleware(
  async (req) => {
    const user = (req as RequestWithUser).decoded;
    // Check if the user has admin role
    if (user.role !== "ADMIN") {
      throw new CustomError({
        status: 403,
        message: "Access denied. Admins only.",
        extraDetails: "User does not have admin privileges",
      });
    }
  }, "Error in admin authorization middleware");
