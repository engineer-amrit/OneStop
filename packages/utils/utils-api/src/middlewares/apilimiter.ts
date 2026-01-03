// express rate limiter
import rateLimit from "express-rate-limit";
import type { Request, Response, NextFunction } from "express";
import { Ienv } from "@schema/common";
// create a rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again after 15 minutes"
  },
});

export const rateLimiter = (config: Ienv) => async (req: Request, res: Response, next: NextFunction) => {
  if (config.NODE_ENV === "production")
    await limiter(req, res, next);
  else
    next();
};
