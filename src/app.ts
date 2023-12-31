import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routes from './routes/routes';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import { errorLogger, requestLogger } from './middlewares/logger';
import error from './middlewares/error';
import userValidation from './validation/user-validation';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(requestLogger);
app.use('/signin', userValidation.validationLogin, login);
app.use('/signup', userValidation.validationCreateUser, createUser);
app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT);
