import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      console.error('Validation error details:', error);
      if (error instanceof ZodError) {
         res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        });
         return;
      }
      return next(error);
    }
  };
