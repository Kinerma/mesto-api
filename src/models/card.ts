import { model, Schema, ObjectId } from 'mongoose';
import { urlValid } from '../validation/user-validation';

export interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId;
  createdAt: Date
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (avatar: string) => urlValid.test(avatar),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('card', cardSchema);
