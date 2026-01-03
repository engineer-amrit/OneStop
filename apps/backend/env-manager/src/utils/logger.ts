import { env } from "../config/env.js";
import { CustomLogger } from "@utils/api";

export const accessLogger = new CustomLogger("access", env)
export const errorLogger = new CustomLogger("general", env)