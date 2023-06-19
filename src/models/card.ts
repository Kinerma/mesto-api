import { model, Schema, ObjectId } from 'mongoose';

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
    default: Date.now(),
  },
});

export default model<ICard>('Card', cardSchema);
