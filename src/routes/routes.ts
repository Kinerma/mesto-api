import {
  NextFunction, Request, Response, Router,
} from 'express';
import cardRouter from './cards';
import usersRouter from './users';
import NotFound from '../errors/centralized/not-found';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/cards', cardRouter);
routes.use((req:Request, res:Response, next: NextFunction) => next(new NotFound('карточка и пользователь не найдены')));
export default routes;
