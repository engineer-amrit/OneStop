import dotenv from "dotenv";
import { envSchema } from "@schema/common";
dotenv.config();

const cfg = {
  DB_URL: process.env.DB_URL,
  API_KEY: process.env.API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  CSRF_SECRET: process.env.CSRF_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DOMAIN: process.env.DOMAIN,
  CLIENT_URL: process.env.CLIENT_URL,
  TEST_KEY: process.env.TEST_KEY,
};


export default envSchema.parse(cfg);
