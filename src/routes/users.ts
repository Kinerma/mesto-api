import { Router } from 'express';
import {
  returnUsers, returnUsersId, updateUser, updateAvatar, getUser,
} from '../controllers/users';
import userValidation from '../validation/user-validation';

const usersRouter = Router();

usersRouter.get('/', returnUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/me', userValidation.validationReturnUsersId, returnUsersId);
usersRouter.patch('/me', userValidation.validationUpdateUser, updateUser);
usersRouter.patch('/me/avatar', userValidation.validationUpdateAvatar, updateAvatar);

export default usersRouter;
