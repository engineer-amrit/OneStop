import path from "path";
import { fileURLToPath } from "url";
import { CustomLogger } from "@utils/api";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.resolve(__dirname, "../../logs");





export const generalLogger = new CustomLogger("general", config, logsDir);
export const accessLogger = new CustomLogger("access", config, logsDir);
