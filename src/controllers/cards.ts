import { Request, Response } from 'express';
import Card from '../models/card';
import { DEFAULT_ERROR, ERROR_NOT_FOUND, INCORRECT_DATA_ERROR } from '../errors/errors';

export const returnCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' }));

export const deleteCardId = (req: Request, res: Response) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = (req as any).user?._id;
  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

export const likeCard = (req: any, res: Response) => {
  // eslint-disable-next-line max-len
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true, runValidators: true })
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR).send({ message: 'Передан не корректный id карточки' });
      }
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR).send({ message: 'Не корректные данные чтобы поставить лайка' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

export const deleteLikeCard = (req: any, res: Response) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR).send({ message: 'Передан не корректный id карточки' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};
