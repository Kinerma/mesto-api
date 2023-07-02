import { INCORRECT_DATA_ERROR } from '../errors';

export default class IncorrectData extends Error {
  public statusCode: typeof INCORRECT_DATA_ERROR;

  constructor(message: string) {
    super(message);
    this.statusCode = INCORRECT_DATA_ERROR;
  }
}
