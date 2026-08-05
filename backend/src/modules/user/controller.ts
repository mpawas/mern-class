import { Request, Response } from 'express';
import { createUserService, getUserByIdService, getUserByFilter } from './service';

export const createUser = async (req: Request, res: Response) => {
  const a = req.body;
  console.log('controller called');
  const { email, password, name } = a;

  console.time('service');
  const userResponse = await createUserService(name, email, password);
  console.timeEnd('service');

  console.log('controller finished');
  return res.status(userResponse.statusCode).json(userResponse);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserByIdService(String(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ data: { user } });
};

export const getUserFromFilter = async (req: Request, res: Response) => {
  const { dob } = req.query;
  const users = await getUserByFilter(dob as string);
  res.status(200).json(users);
};
