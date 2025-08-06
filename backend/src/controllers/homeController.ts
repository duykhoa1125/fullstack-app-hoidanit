import { Request, Response } from "express";

export const getHomepage = (_req: Request, res: Response): void => {
    res.render('sample.ejs');
};
