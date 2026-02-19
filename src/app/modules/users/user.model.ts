import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserModel, TUser, USER_ROLE, UserPlan } from './user.interface.js';
import config from '../../config/index.js';


const userSchema = new Schema<TUser, IUserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { type: String, required: true, select: 0 }, // generally password should not be selected by default
    role: { 
      type: String, 
      enum: Object.values(USER_ROLE), 
      default: USER_ROLE.user 
    },
    isBlocked: { type: Boolean, default: false },

    // --- Reward Wallet ---
    wallet: {
      interestCount: { type: Number, default: 5 },
      connectionCount: { type: Number, default: 0 },
      canChat: { type: Boolean, default: false },
    },

    // --- Referral & Plan Tracking ---
    referralCode: { 
      type: String, 
      unique: true, 
      required: true 
    },
    referredBy: { 
      type: String, 
      default: null 
    },

    referralStats: {
      approvedReferrals: { type: Number, default: 0 },
    },

    plan: { 
      type: String, 
      enum: Object.values(UserPlan), 
      default: UserPlan.FREE 
    },
    premiumUntil: { type: Date, default: null },
    isUnlimited: { type: Boolean, default: false },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// --- Middleware: Password Hashing ---
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round)
    );
  }
  // next();
});

// --- Static Methods ---
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// --- Indexes ---
userSchema.index({ referralCode: 1 });
userSchema.index({ email: 1 });

export const User = model<TUser, IUserModel>('User', userSchema);