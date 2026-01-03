// src/classes/CustomError.ts
export class CustomError extends Error {
    status: number
    extraDetails?: string

    constructor(config: { status: number; message?: string; extraDetails?: string }) {
        const { status, message, extraDetails } = config
        super(message)

        // FIX prototype chain
        Object.setPrototypeOf(this, new.target.prototype)

        this.name = new.target.name
        this.status = status
        this.extraDetails = extraDetails

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, new.target)
        }
    }
}
