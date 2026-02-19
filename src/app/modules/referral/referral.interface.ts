import { Types } from "mongoose";

export type TReferralStatus = 'Joined' | 'Biodata_Submitted' | 'Approved' | 'Rejected';

export interface TReferral {
  referrerId: Types.ObjectId;   // who invite (User ID)
  referredUserId: Types.ObjectId; // who newly joined (User ID)
  status: TReferralStatus;      // present status of the referral
  rewardGranted: boolean;       //5 interests, 1 connection, chat access
  createdAt: Date;
  updatedAt: Date;
}