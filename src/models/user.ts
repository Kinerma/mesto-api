import {
  model, Schema, Model, Document,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import Authorization from '../errors/centralized/authorization-error';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string
}

interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (avatar: string) => validator.isURL(avatar, { protocols: ['http', 'https'] }),
      message: 'Не корректная ссылка',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Неправильный формат почты',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Authorization('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Authorization('Неправильные почта или пароль'));
          }
          return user;
        });
    });
});

export default model<IUser, UserModel>('user', userSchema);
