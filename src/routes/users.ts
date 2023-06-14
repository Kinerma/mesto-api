import {Router} from "express";
import {returnUsers, createUser, returnUsersId} from "../controllers/users";

const router = Router()

router.get('/', returnUsers)
router.get('/:userId', returnUsersId)
router.post('/', createUser)

export default router