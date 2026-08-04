import { Request, Response } from 'express';
import * as service from './service';

const signUp = async (req: Request, res: Response) => {
  try {
    const a = req.body;

    const userResponse = await service.signup(a);

    return res.status(userResponse.statusCode).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(400).json({
      message: error instanceof Error ? error.message : 'Failed to create user',
    });
  }
};

export { signUp };
