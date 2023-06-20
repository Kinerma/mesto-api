import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes';

const { PORT = 3000 } = process.env;
const app = express();
mongoose.set('strictQuery', false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6490a316c4666c2129e37086',
  };
  next();
});

app.use(routes);
app.listen(PORT);
