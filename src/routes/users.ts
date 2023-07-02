import { Router } from 'express';
import {
  returnUsers, returnUsersId, updateUser, updateAvatar, getUser
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', returnUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/me', returnUsersId);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

export default usersRouter;
