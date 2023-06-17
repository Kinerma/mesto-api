import {Router} from "express";
import {returnUsers, createUser, returnUsersId, updateUser, updateAvatar} from "../controllers/users";

const usersRouter = Router()

usersRouter.get('/', returnUsers)
usersRouter.get('/:userId', returnUsersId)
usersRouter.post('/', createUser)
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

export default usersRouter