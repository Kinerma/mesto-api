import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import IncorrectData from '../errors/centralized/incorrect-data';
import NotFound from '../errors/centralized/not-found';
import DeletionError from '../errors/centralized/deletion';

export const returnCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(next);

export const deleteCardId = (req: any, res: Response, next: NextFunction) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      } if (card.owner.toString() !== req.user._id) {
        throw new DeletionError('Нельзя удалить чужую карточку');
      } else {
        card.deleteOne({ _id: req.params.cardId })
          .then(() => {
            res.send({ message: 'Карточка удалена' });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Передан не корректный id карточки'));
      } else {
        next(err);
      }
    });
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = (req as any).user?._id;
  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

export const likeCard = (req: any, res: Response, next: NextFunction) => {
  // eslint-disable-next-line max-len
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true, runValidators: true })
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка не найдена'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Передан не корректный id карточки'));
      }
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Не корректные данные чтобы поставить лайка'));
      } else {
        next(err);
      }
    });
};

export const deleteLikeCard = (req: any, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Передан не корректный id карточки'));
      } else {
        next(err);
      }
    });
};
