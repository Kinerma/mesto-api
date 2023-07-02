import { JwtPayload, verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { RequestAuth } from './type';
import Authorization from '../errors/centralized/authorization-error';

export default (req: RequestAuth, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Authorization('Необходима авторизация'));
  }
  let payload;
  try {
    payload = verify(authorization!.replace('Bearer ', ''), 'some-secret-key');
  } catch (err) {
    return next(new Authorization('Необходима авторизация'));
  }
  req.user = payload as { _id: JwtPayload };
  return next();
};
