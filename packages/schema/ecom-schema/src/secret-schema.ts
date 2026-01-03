import { z } from "zod";
import { envSchema, type Ienv } from "@schema/common";

const KeySchema = z.string().uppercase().regex(/^[A-Z0-9_]+$/, "Keys must be uppercase alphanumeric with underscores");

export const secret = z.object({
    nodeEnv: envSchema.shape.NODE_ENV,
    projectName: z.string().min(1),
    secrets: z.record(KeySchema, z.string()),
})

const nodeEnvValues = Object.values(envSchema.shape.NODE_ENV.enum);

export const deleteFile = z.object({
    fileName: z
        .string()
        .min(1)
        .refine((val) => {
            if (!val.endsWith(".env")) return false;

            const parts = val.split(".");
            if (parts.length !== 3) return false;

            const [, nodeEnv] = parts;
            return nodeEnvValues.includes(nodeEnv as Ienv["NODE_ENV"]);
        }, {
            message: "Filename must be <app>.<NODE_ENV>.env with a valid NODE_ENV",
        }),
});

export const deleteSecret = z.object({
    secretKey: KeySchema,
    fileName: deleteFile.shape.fileName,
})

export const newFileName = z.object({
    newFileName: deleteFile.shape.fileName,
})

export const newKeyName = z.object({
    newKeyName: deleteSecret.shape.secretKey,
})

export const secretValue = z.object({
    secretValue: z.string().min(1),
})

export type Secret = z.infer<typeof secret>;
export type DeleteSecretFile = z.infer<typeof deleteFile>;
export type DeleteSecretKey = z.infer<typeof deleteSecret>;
export type NewFileName = z.infer<typeof newFileName>;
export type NewKeyName = z.infer<typeof newKeyName>;
export type SecretValue = z.infer<typeof secretValue>;