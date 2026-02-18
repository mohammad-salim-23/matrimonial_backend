import { Schema, model } from 'mongoose';
import { IUserModel, TUser, USER_ROLE } from './user.interface.js';
import { config } from 'dotenv';
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is requires'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'password must be provided'],
    //   select: 0, // default password field will not be selected in queries
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.user,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    connection: {
      type: Number,
      default: 0, 
    },
    
  },
  {
    timestamps: true, 
  },
);





//  static method
// userSchema.statics.isUserExistsByEmail = async function (email: string) {
//   return await this.findOne({ email });
// };
userSchema.statics.isUserExistsByEmail = async function(email:string) {
    return await this.findOne({email: email}).select('+password');
}

// static mehod: matched the password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
    if(!hashedPassword){
        throw new Error("Hasjed password is missing or invalid")
    }
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, IUserModel>('User', userSchema);