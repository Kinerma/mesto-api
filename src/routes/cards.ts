import {Router} from "express";
import {returnCards, deleteCardId, createCard} from "../controllers/cards";

const router = Router()

router.get('/', returnCards)
router.delete('/:cardId', deleteCardId)
router.post('/', createCard)

export default router