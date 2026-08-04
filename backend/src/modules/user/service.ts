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
    throw new Error('Please provide email, name, password');
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('user already exist');
  }

  const user = await User.create({ name, email, password });
  console.log(user);

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
    throw new Error('user is not available');
  }
  const _true = user.password === password;
  if (!_true) {
    throw new Error('password doesnpt match');
  }
  return { user };
};

export const getUserByIdService = async (id: string) => {
  const user = await User.findById(id).exec();
  if (user) return user;
  throw new Error('User not found');
};

export const getUserByFilter = async (dob: string) => {
  const users = await User.find({ dob }).exec();
  if (users) users;
  throw new Error('user not found');
};
