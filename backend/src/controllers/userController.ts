import { Request, Response } from "express";
import { createUserService, loginService, getUserService } from "../services/userService";

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;
    const data = await createUserService(name, email, password);
    return res.status(200).json(data);
};

export const handleLogin = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data);
};

export const getUser = async (_req: Request, res: Response): Promise<Response> => {
    const data = await getUserService();
    return res.status(200).json(data);
};