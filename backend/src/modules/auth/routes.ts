import { Router } from 'express';

import * as controller from './controllers';

const authRoutes = Router();

authRoutes.post('/signup', controller.signUp);

export default authRoutes;
