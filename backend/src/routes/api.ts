import express, { Request, Response } from 'express';
import { createUser, handleLogin, getUser } from '../controllers/userController';
import auth from '../middleware/auth';

const routerAPI = express.Router();

routerAPI.get('/', (_req: Request, res: Response) => {
    return res.status(200).json({ message: "hello api" });
});
routerAPI.use(auth);

routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);

routerAPI.get('/user', getUser);

export default routerAPI;
