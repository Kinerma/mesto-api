import {Request, Response, Router} from "express";
import cardRouter from "./cards";
import usersRouter from "./users"

const routes = Router()
routes.use('/users', usersRouter);
routes.use('/cards', cardRouter);
routes.use((req:Request, res:Response) => res.status(404).send({ message: 'карточка и пользователь не найдены' }));
export default routes;