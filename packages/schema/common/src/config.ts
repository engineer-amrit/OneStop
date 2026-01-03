import z from "zod";

export const envSchema = z.object({
    DB_URL: z.string().min(1),
    PORT: z.coerce.number(),
    API_KEY: z.string().min(1),
    CLIENT_URL: z.url(),
    DOMAIN: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    CSRF_SECRET: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "staging"]),
    HOST: z.string().min(1).default("localhost"),
    TEST_KEY: z.string().min(1).optional(),
});

export type Ienv = z.infer<typeof envSchema>;