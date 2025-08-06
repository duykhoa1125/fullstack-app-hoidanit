import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction): void | Response => {
  const white_list = ["/login", "/register"];
  if (white_list.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }
        const decoded = jwt.verify(token, jwtSecret);
        console.log(decoded);
        next();
      } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "token expire//invalid" });
      }
    } else {
      return res.status(401).json({ message: "token expire//invalid" });
    }
  }
};

export default auth;
