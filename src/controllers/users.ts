import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFound from '../errors/centralized/not-found';
import ConflictError from '../errors/centralized/conflict-error';
import IncorrectData from '../errors/centralized/incorrect-data';

export const returnUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const returnUsersId = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Передан некорректный id профиля'));
      } else {
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, password: hash, email: req.body.email,
    }))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Переданы некорректные данные при обновлении профиля'));
      } else if (err.code === 11000) {
        next(new ConflictError('Данный пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

export const updateUser = (req: any, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (req: any, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  if (avatar === undefined) {
    next(new IncorrectData('Переданы некорректные данные при обновлении аватара'));
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectData('Переданы некорректные данные при обновлении аватара'));
      }
      return next(err);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.send({ data: user });
    });
};
