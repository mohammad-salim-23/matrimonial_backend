import { Model, Types } from "mongoose";

// User Roles
export const USER_ROLE = {
  user: 'user', 
  admin: 'admin',
} as const;

export type TUserRole = keyof typeof USER_ROLE;

// User Plans
export enum UserPlan {
  FREE = 'Free',
  BASIC = 'Basic',
  SILVER = 'Silver',
  PREMIUM = 'Premium', 
}

// 1. Base User Interface
export interface TUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  isBlocked: boolean;
  
  // --- Reward Wallet ---
  wallet: {
    interestCount: number;      // Default: 5
    connectionCount: number;    // Default: 0
    canChat: boolean;           // Default: false
  };

  // --- Referral & Plan Tracking ---
  referralCode: string;         
  referredBy: string | null;    
  
  referralStats: {
    approvedReferrals: number;  
  };

  plan: UserPlan;               
  premiumUntil: Date | null;    
  isUnlimited: boolean;         
}

// 2. Registration Payload 
export type TRegisterUser = Pick<TUser, 'name' | 'email' | 'password'> & {
  referredBy?: string; // optional referral code during registration
};

// 3. Login Payload
export type TLoginUser = Pick<TUser, 'email' | 'password'>;

// 4. Mongoose Model Interface
export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string, 
    hashedPassword: string
  ): Promise<boolean>;
}