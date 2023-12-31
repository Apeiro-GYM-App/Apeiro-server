import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  isPasswordChange: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    required: true,
  },
  clientData: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: false,
  },
  coachData: {
    type: Schema.Types.ObjectId,
    ref: 'Coach',
    required: false,
  },
  adminData: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: false,
  },
});

// hash the password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_round),
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
