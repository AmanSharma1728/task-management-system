import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  const statusCode = err.message.includes('not found') ? 404 : 
                     err.message.includes('empty') ? 400 : 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};
