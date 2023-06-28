import { CONFLICT_ERROR } from '../errors';

export default class conflictError extends Error {
  public statusCode: typeof CONFLICT_ERROR;
  constructor(message: string) {
    super(message);
    this.statusCode = CONFLICT_ERROR;
  }
}
