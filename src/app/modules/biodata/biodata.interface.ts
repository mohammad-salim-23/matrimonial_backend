import { Types } from "mongoose";

export enum Gender { MALE = "Male", FEMALE = "Female" }
export enum CreatedBy { SELF = "Self", FATHER = "Father", MOTHER = "Mother", BROTHER = "Brother", SISTER = "Sister", UNCLE = "Uncle", FRIEND = "Friend" }
export enum UserStatus { PENDING = "Pending", APPROVED = "Approved", REJECTED = "Rejected" }
export enum VerificationBadge { NONE = "None", NID_VERIFIED = "NID Verified", STUDENT_ID_VERIFIED = "Student ID Verified", JOB_ID_VERIFIED = "Job ID Verified" }
export enum MaritalStatus { SINGLE = "Single", DIVORCED = "Divorced", WIDOWED = "Widowed" }
export enum SkinTone { FAIR = "Fair", VERY_FAIR = "Very Fair", MEDIUM = "Medium", WHEATISH = "Wheatish", DARK = "Dark" }
export enum EconomicalStatus { UPPER_CLASS = "Upper Class", UPPER_MIDDLE_CLASS = "Upper Middle Class", MIDDLE_CLASS = "Middle Class", LOWER_MIDDLE_CLASS = "Lower Middle Class" }
export enum BloodGroup { "A+" = "A+", "A-" = "A-", "B+" = "B+", "B-" = "B-", "AB+" = "AB+", "AB-" = "AB-", "O+" = "O+", "O-" = "O-" }

export interface ISibling {
  relation: "Brother" | "Sister";
  maritalStatus: MaritalStatus;
  educationalQualification?: string;
  occupation?: string;
}

export interface IBiodata {
  userId: Types.ObjectId;
  biodataType: "Personal" | "Family";
  postedBy: CreatedBy;
  
  privateInfo: {
    fullName: string;
    email: string;
    contactNumber: string;
    guardianNumber: string;
    guardianRelation: "Father" | "Mother" | "Brother" | "Sister" | "Uncle" | "Other";
     socialMedia: { facebook?: string; instagram?: string; linkedin?: string };
  documents: { nidCardUrl?: string; studentIdCardUrl?: string; jobIdCardUrl?: string };
  };

  gender: Gender;
  age: number;
  dateOfBirth: Date;
  maritalStatus: MaritalStatus;
  bloodGroup: BloodGroup;

  physicalStats: {
    height: string;
    weight: number;
    skinTone: SkinTone;
  };
 
  education: {
    ssc: { board: string; year: string; result: string };
    hsc: { board: string; year: string; result: string };
    graduation: {
      variety: "Varsity" | "Engineering" | "Medical" | "Graduate";
      department: string;
      institution: string;
      passingYear: string;
    };
  };

  occupation: {
    isExpat: boolean; // প্রবাসী কি না
    countryName?: string; // প্রবাসী হলে কোন দেশ
    profession: string;
    designation: string;
    monthlyIncome?: string;
  };

  familyDetails: {
    father: { isAlive: boolean; occupation: string };
    mother: { isAlive: boolean; occupation: string };
    siblingsCount: number;
    siblingsDetails: ISibling[]; // dynamic list of siblings
    economicalStatus: EconomicalStatus;
    familySummary: string;
  };

  address: {
    present: { division: string; district: string; thana: string; houseInfo?: string };
    permanent: { division: string; district: string; thana: string; houseInfo?: string };
  };

  religion: {
    faith: "Islam" | "Hinduism" | "Buddhism" | "Christianity" | "Other";
    sectOrCaste?: string;
    practiceLevel: "Practicing" | "Regular" | "Occasional" | "Not Practicing";
    dailyLifeStyleSummary: string;
    habits: string[];
    religiousLifestyleDetails: string;
  };

 

  partnerPreference: {
    religiousExpectation: "Very Religious" | "Moderate" | "Liberal" | "Any";
    expectedMaritalStatus: MaritalStatus[];
    expectedEconomicalStatus?: EconomicalStatus[];
    generalQualities: string;
    ageRange: { min: number; max: number };
  };

  status: UserStatus;
  badge: VerificationBadge;
  createdAt: Date;
  updatedAt: Date;
}