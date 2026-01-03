import type { Request, Response } from "express";
import { Media } from "../file/media.js";
import { BlockHandler } from "./blockHandler.js";

type FilePath = string | string[] | undefined;

type Body = Record<string, FilePath>

export class MediaController<T = undefined> extends BlockHandler<T> {
    constructor(private media: Media, private paths: string[]) { super(); }
    protected async beforeErrorHandling(req: Request, _: Response) {
        const body: Body = req.body
        const toBeDeleted = [];
        for (const path of this.paths) {
            const filePath = body[path];
            if (!filePath) continue;
            if (Array.isArray(filePath)) {
                toBeDeleted.push(...filePath);
            }
            else {
                toBeDeleted.push(filePath);
            }
        }
        await this.media.deleteFiles(toBeDeleted, req);
    }

}

