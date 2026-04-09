import { Request, Response, NextFunction } from "express";
import { BaseError } from "@shared/errors/base-error";
import { ErrorCodes } from "@shared/errors/codes";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof BaseError) {
    return res.status(err.code).json({
      error: err.message,
    });
  }

  console.error(err);

  return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal server error",
  });
}
