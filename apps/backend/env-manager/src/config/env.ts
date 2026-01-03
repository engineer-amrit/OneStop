import dotenv from 'dotenv';
import { envSchema } from '@app/schema';

dotenv.config();

const env = envSchema.pick({
    PORT: true,
    NODE_ENV: true,
    API_KEY: true,
}).parse(process.env);

export { env };