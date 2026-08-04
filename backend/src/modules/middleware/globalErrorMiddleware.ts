import { NextFunction, Request, Response } from 'express';
import HttpException from '../exception/httpException';
import mongoose from 'mongoose';

interface ErrorResponse {
  status: string;
  message: string;
  stack?: string;
  code?: number | string;
  errors?: any;
}

const errorMiddleware = (
  error: Error | HttpException,
  request: Request,
  response: Response,

  next: NextFunction,
) => {
  let status = 500;
  let errorResponse: ErrorResponse = {
    status: 'error',
    code: 500,
    message: 'Internal server error',
  };

  // Handle known custom exceptions
  if (error instanceof HttpException) {
    status = error.status;
    errorResponse = {
      status: 'error',
      code: error.code,
      message: error.message,
    };
  }

  // Handle Mongoose validation errors
  if (error instanceof mongoose.Error.ValidationError) {
    status = 400;
    const validationErrors = Object.values(error.errors).map(err => err.message);
    errorResponse = {
      status: 'fail',
      message: 'Validation error',
      errors: validationErrors,
    };
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (error instanceof mongoose.Error.CastError) {
    status = 400;
    errorResponse = {
      status: 'fail',
      message: `Invalid ${error.path}: ${error.value}`,
    };
  }

  // Handle Mongoose duplicate key error
  if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    status = 400;
    const field = Object.keys((error as any).keyValue)[0];
    errorResponse = {
      status: 'fail',
      message: `Duplicate value for ${field}. Please use another value.`,
    };
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    status = 401;
    errorResponse = {
      status: 'fail',
      message: 'Invalid token. Please log in again.',
    };
  }

  if (error.name === 'TokenExpiredError') {
    status = 401;
    errorResponse = {
      status: 'fail',
      message: 'Your session has expired. Please log in again.',
    };
  }

  // Add stack trace only in development environment
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = error.stack;
  }

  // Log error in development and staging environments
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      'Error:',
      JSON.stringify(
        {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        null,
        2,
      ),
    );
  }

  response.status(status).json(errorResponse);
};

// Utility function to wrap async handlers
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default errorMiddleware;
