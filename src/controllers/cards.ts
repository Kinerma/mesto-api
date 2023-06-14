import {Request, Response} from "express";
import Card from "../models/card";

export const returnCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send({data: cards}))
  .catch(() => res.status(500).send({message: "Произошла ошибка"}))

export const deleteCardId = (req: Request, res: Response) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return Promise.reject(new Error("Карточка не найден"))
      }
      return res.send({data: card})
    })
    .catch(() => res.status(500).send({message: "Произошла ошибка"}))
}

export const createCard = (req: Request, res: Response) => {
  const {name, link} = req.body
  const owner = (req as any).user?._id
  return Card.create({name, link, owner})
    .then((card) => res.send({data: card}))
    .catch(() => res.status(500).send({message: "Произошла ошибка"}))
}