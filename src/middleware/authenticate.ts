import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import ErrorHandler from "../error-handler/ErrorHandler";
import { verify } from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  const secret = process.env.JWT_KEY as string;

  let decodedToken;
  if (!token) {
    const error = new ErrorHandler("Not authenticated!");
    error.statusCode = 401;
    return next(error);
  }
  try {

    decodedToken = verify(token, secret);
  } catch (e) {
    const error = new ErrorHandler((e as Error).message);
    error.statusCode = 500;
    return next(error);
  }


  if (!decodedToken) {
    const error = new ErrorHandler("Not authenticated!");
    error.statusCode = 401;
    return next(error);
  }

  if (typeof decodedToken !== 'string') {
    const {userId, userName} = decodedToken
    req.userId = userId;
    req.userName = userName;
  }

  next();
};
