import { Router } from 'express';
import {
  returnCards, deleteCardId, createCard, deleteLikeCard, likeCard,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', returnCards);
cardRouter.delete('/:cardId', deleteCardId);
cardRouter.post('/', createCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', deleteLikeCard);

export default cardRouter;
