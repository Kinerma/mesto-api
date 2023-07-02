import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestAuth extends Request {
  user?: string | JwtPayload;
}
