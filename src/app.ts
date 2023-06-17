import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from "./routes/routes";

const { PORT = 3000 } = process.env
const app = express()
app.use(express.json())
app.use(express.urlencoded())
mongoose.connect('mongodb://localhost:27017/mestodb')

app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});

app.use(routes);
app.use((req: Request, res: Response) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);