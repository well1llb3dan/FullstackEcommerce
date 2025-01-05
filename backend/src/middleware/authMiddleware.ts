import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  role?: string;
}

const verifyTokenHelper = (
  req: Request,
  res: Response,
  next: NextFunction,
  roleCheck?: (role?: string) => boolean
): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader ? authHeader.replace("Bearer ", "") : null;

  if (!token) {
    res.status(401).send("Access Denied");
    return;
  }
  try {
    if (!process.env.SECRET_KEY) {
      res.status(500).send("Internal Server Error");
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as DecodedToken;
    if (roleCheck && !roleCheck(decoded.role)) {
      res.status(403).send("Access Denied");
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(`verifyTokenHelper - Error: ${(error as Error).message}`);
    res.status(400).send("Invalid token");
  }
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  verifyTokenHelper(req, res, next);
};

export const verifyManager = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  verifyTokenHelper(
    req,
    res,
    next,
    (role) => role === "manager" || role === "admin"
  );
};
