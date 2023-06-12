import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req: any, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});