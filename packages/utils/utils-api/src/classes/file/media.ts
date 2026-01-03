// src/classes/Media.ts
import fs from "fs/promises";
import { CustomError } from "../customError.js";
import type { Request } from "express";
import { CustomLogger } from "./logger.js";

export class Media {
    constructor(private logger: CustomLogger) { }
    async checkPath(filePath: string): Promise<void> {
        try {
            await fs.access(filePath);
        } catch (e) {
            throw new CustomError({
                status: 400,
                message: "File not found",
                extraDetails: e instanceof Error ? e.message : String(e),
            });
        }
    }

    async deleteFile(filePath: string, req: Request): Promise<void> {
        try {
            await fs.rm(filePath, { recursive: true });
        } catch (e) {
            this.logger.error(req, {
                action: "File Deletion Failed at path " + filePath,
                message: e instanceof Error ? e.message : String(e),
            })
        }
    }

    // 🔥 New Optimized Methods (MULTIPLE FILES)

    async checkImagesExist(filePaths: string[]): Promise<void> {
        await Promise.all(filePaths.map((path) => this.checkPath(path)));
    }

    async deleteFiles(filePaths: string[], req: Request): Promise<void> {
        await Promise.all(filePaths.map((path) => this.deleteFile(path, req)));
    }
}
