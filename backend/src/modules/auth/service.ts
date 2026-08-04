import { JWT_SECRET } from '../../environmentValidation';
import { createUserService } from '../user/service';
import * as jwt from 'jsonwebtoken';

const signup = async (a: any) => {
  const { name, password, email } = a;
  if (!name || !password || !email) throw new Error('name, password, email is required');
  const { data } = await createUserService(name, email, password);
  const user = data.user;

  const token = jwt.sign(
    {
      email: user.email,
      name: name,
      role: 'user',
    },
    JWT_SECRET,
  );
  return {
    statusCode: 201,
    token,
    data: {
      user,
    },
  };
};

export { signup };
