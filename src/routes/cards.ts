import {Router} from "express";
import {returnCards, deleteCardId, createCard} from "../controllers/cards";

const cardRouter = Router()

cardRouter.get('/', returnCards)
cardRouter.delete('/:cardId', deleteCardId)
cardRouter.post('/', createCard)

export default cardRouter