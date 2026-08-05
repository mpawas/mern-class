import HttpException from '../exception/httpException';
import UserNotFoundError from '../exception/someRandom';
import User, { IUser } from './schema';
import formatUserResponse from './utils';

export const createUserService = async (
  name: string,
  email: string,
  password: string,
): Promise<{
  statusCode: number;
  success: boolean;
  data: { user: Partial<IUser> };
}> => {
  console.log('service initialized');
  if (!name || !email || !password) {
    throw new HttpException(400, 'Please provide email, name, password', 'user.not.found');
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new HttpException(402, 'user already exist');
  }

  const user = await User.create({ name, email, password });

  return {
    statusCode: 201,
    success: true,
    data: {
      user: formatUserResponse(user) as IUser,
    },
  };
};

export const updateUserService = async (email: string, params: Partial<IUser>) => {
  const user = await User.findOneAndUpdate({ email: email }, params, {
    returnDocument: 'after',
  }).exec();
  return {
    user,
  };
};
export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new UserNotFoundError(404, 'user not found');
  }
  const _true = user.password === password;
  if (!_true) {
    throw new HttpException(401, 'Please provide the valid emal and passowrd');
  }
  return { user };
};

export const getUserByIdService = async (id: string) => {
  const user = await User.findById(id).exec();
  if (user) return user;
  throw new HttpException(404, 'User not found');
};

export const getUserByFilter = async (dob: string) => {
  const users = await User.find({ dob }).exec();
  if (users) users;
  throw new HttpException(404, 'user not found');
};
