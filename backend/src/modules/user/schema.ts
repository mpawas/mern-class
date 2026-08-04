import { model, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  dob?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  email: { type: String, required: [true, 'The email is required'] },
  avatar: String,
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
  dob: {
    type: String,
    required: false,
  },
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;
