import { DELETION_ERROR } from '../errors';

export default class DeletionError extends Error {
  public statusCode: typeof DELETION_ERROR;

  constructor(message: string) {
    super(message);
    this.statusCode = DELETION_ERROR;
  }
}
