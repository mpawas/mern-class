import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../environmentValidation';

///Bearer token.split(' ')= [Bearer, token]

export const verifyAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers['Authozarion'] && String(req.headers['Authozarion']).split(' ')[1]; /// Bearer token

  const verifedToken = jwt.verify(authToken!, JWT_SECRET, () => {});

  next();
};
