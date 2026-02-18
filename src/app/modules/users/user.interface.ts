import { Model } from "mongoose";

// user role
export const USER_ROLE = {
  user: 'user', // Seller
  micro_collector: 'micro-collector',
  hub: 'hub', // Large Collector
  admin: 'admin',
} as const;

export type TUserRole = keyof typeof USER_ROLE;

export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
};

export interface TUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  isBlocked: boolean;
  connection: number; 
}

// Mongoose Model Interface
export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}