///routes handlers
import { Router } from 'express';
import { createUser, getUserById } from './controller';
import { getUserByFilter } from './service';
import { verifyAuthentication } from '../middleware/authMiddleware';

const userRoutes = Router();

userRoutes.get('/', () => {
  console.log('sdfasdf');
});

userRoutes.post('/createUser', createUser);
userRoutes.get('/user/:id', verifyAuthentication, getUserById);
userRoutes.get('/user/filter', verifyAuthentication, getUserByFilter);

// http://localhost:3000/auth/login/idasdf?price=lowtohigh&range=10-20

export default userRoutes;
