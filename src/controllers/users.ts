import {Request, Response} from "express";
import User from "../models/user";

export const returnUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send({data: users}))
  .catch(() => res.status(500).send({message: "Произошла ошибка"}))

export const returnUsersId = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Пользователь не найден"))
      }
      return res.send({data: user})
    })
    .catch(() => res.status(500).send({message: "Произошла ошибка"}))
}

export const createUser = (req: Request, res: Response) => {
  const {name, about, avatar} = req.body
  return User.create({name, about, avatar})
    .then((user) => res.send({data: user}))
    .catch(() => res.status(500).send({message: "Произошла ошибка"}))
}