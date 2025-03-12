import {AxiosResponse} from "axios";

export class SentrixApiError extends Error {
    statusCode: number;
    trace: string | undefined;

    constructor(response: AxiosResponse) {
        super(response.data?.message);
        this.name = "SentrixApiError"; // Setting the error name explicitly
        this.statusCode = response.status;
        this.trace = response.data?.trace;

        // Maintain proper stack trace (only works in V8 environments like Node.js)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, SentrixApiError);
        }
    }

    /**
     * Convert the error to a string representation
     * @returns A formatted string containing the error message and response details
     */
    toString(): string {
        return `${this.name}: ${this.message}\n${
            this.trace != undefined && `Trace: ${this.trace}`
        }`;
    }
}
