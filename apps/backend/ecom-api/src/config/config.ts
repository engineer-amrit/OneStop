import dotenv from "dotenv";
import { envSchema } from "@schema/common";
dotenv.config();

const cfg = {
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  CSRF_SECRET: process.env.CSRF_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  DOMAIN: process.env.DOMAIN,
  CLIENT_URL: process.env.CLIENT_URL,
  TEST_KEY: process.env.TEST_KEY,
};


export default envSchema.pick({
  DB_URL: true,
  JWT_SECRET: true,
  CSRF_SECRET: true,
  NODE_ENV: true,
  DOMAIN: true,
  CLIENT_URL: true,
  TEST_KEY: true,
}).parse(cfg);
