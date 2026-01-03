import type { Request, Response } from 'express';

interface Etype {
    status?: number;
}

const errorMiddleware = (err: Error & Etype, _: Request, res: Response) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    console.error(`Error: ${message}`);
    res.status(status).json({ error: message });
}

export default errorMiddleware;