class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Handle Status Code 401 Unauthorized
 */
export class UnauthorizedError extends HttpError {}

/**
 * Handle Status Code 409
 */
export class ConflictError extends HttpError {}

// TODO: Add Error Classes as needed.