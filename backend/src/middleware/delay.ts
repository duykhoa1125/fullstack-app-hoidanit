import { Request, Response, NextFunction } from "express";

const delay = (req: Request, _res: Response, next: NextFunction): void => {
  setTimeout(() => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
    }
    next();
  }, 3000);
};

export default delay;
