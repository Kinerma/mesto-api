import { AUTHORIZATION_ERROR } from '../errors';

export default class Authorization extends Error {
  public statusCode: typeof AUTHORIZATION_ERROR;
  constructor(message: string) {
    super(message);
    this.statusCode = AUTHORIZATION_ERROR;
  }
}
