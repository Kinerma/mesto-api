import { Router } from 'express';
import {
  returnCards, deleteCardId, createCard, deleteLikeCard, likeCard,
} from '../controllers/cards';
import cardsValidation from '../validation/cards-validation';

const cardRouter = Router();

cardRouter.get('/', returnCards);
cardRouter.delete('/:cardId', cardsValidation.validationCard, deleteCardId);
cardRouter.post('/', cardsValidation.validationCreateCard, createCard);
cardRouter.put('/:cardId/likes', cardsValidation.validationCard, likeCard);
cardRouter.delete('/:cardId/likes', cardsValidation.validationCard, deleteLikeCard);

export default cardRouter;
