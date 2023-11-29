import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
  next();
}

export default errorHandler
