import { NextFunction, Request, Response } from 'express';

interface Error {
    errno?: number;
}

export class ValidationError extends Error {}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // SQL DUPLICATE EMAIL ERROR
    if (err.errno === 1062) {
        res.status(400).json({
            success: false,
            message: 'This e-mail exists in the database. Please enter a new one',
        });
        return;
    }
    // VALIDATION ERROR
    if (err instanceof ValidationError) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        return;
    }
    // SERVER ERRORS
    res.status(500).json({
        success: false,
        message: 'Sorry, please try again later.',
    });
};