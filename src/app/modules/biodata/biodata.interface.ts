// types/biodata.interface.ts

export enum Gender {
  MALE = "Male",
  FEMALE = "Female"
}

export enum UserStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected"
}

export enum VerificationBadge {
  NONE = "None",
  NID_VERIFIED = "NID Verified",
  STUDENT_ID_VERIFIED = "Student ID Verified",
  JOB_ID_VERIFIED = "Job ID Verified"
}

export enum MaritalStatus {
  SINGLE = "Single",
  DIVORCED = "Divorced",
  WIDOWED = "Widowed"
}

export enum SkinTone {
  FAIR = "Fair",
  VERY_FAIR = "Very Fair",
  MEDIUM = "Medium",
  WHEATISH = "Wheatish",
  DARK = "Dark"
}

export enum EconomicalStatus {
  UPPER_CLASS = "Upper Class",
  UPPER_MIDDLE_CLASS = "Upper Middle Class",
  MIDDLE_CLASS = "Middle Class",
  LOWER_MIDDLE_CLASS = "Lower Middle Class"
}

export interface IBiodata {
  // --- Private Info (Hidden from public profile) ---
  privateInfo: {
    fullName: string; 
    email: string; // Must be unique
    contactNumber: string;
    guardianNumber: string;
    guardianRelation: "Father" | "Mother" | "Brother" | "Sister" | "Uncle" | "Other";
  };

  // --- Profile Basics ---
  gender: Gender;
  age: number;
  dateOfBirth: Date;
  maritalStatus: MaritalStatus;
  
  // --- Physical Attributes ---
  physicalStats: {
    height: string; // e.g., "5' 7\""
    weight: number; // in kg
    skinTone: SkinTone;
  };

  // --- Detailed Education ---
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

  // --- Profession & Income ---
  occupation: {
    profession: string;
    designation: string;
    monthlyIncome?: string; // Recommended for Male profiles
  };

  // --- Family Details ---
  familyDetails: {
    father: { 
      isAlive: boolean; 
      occupation: string; // e.g., "Retired Govt. Officer"
    };
    mother: { 
      isAlive: boolean; 
      occupation: string; // e.g., "Homemaker" or "Teacher"
    };
    siblingsCount: number;
    economicalStatus: EconomicalStatus;
    familySummary: string; // Details about family background and siblings
  };

  // --- Address ---
  address: {
    division: string;
    district: string;
    thana: string;
  };

  // --- Religion & Lifestyle ---
  religion: {
    faith: "Islam" | "Hinduism" | "Buddhism" | "Christianity" | "Other";
    sectOrCaste?: string; // Optional (e.g., Sunni-Hanafi or Brahmin)
    practiceLevel: "Practicing" | "Regular" | "Occasional" | "Not Practicing";
    dailyLifeStyleSummary: string; // Summary of daily routine and life philosophy
    habits: string[]; // e.g., ["No Smoking", "Prayer", "Reading"]
    religiousLifestyleDetails: string; // Views on Hijab/Niqab or opposite sex interaction
  };

  // --- Social Media & Verification Documents ---
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };

  documents: {
    nidCardUrl?: string;
    studentIdCardUrl?: string;
    jobIdCardUrl?: string;
  };

  // --- Partner Preference ---
  partnerPreference: {
    religiousExpectation: "Very Religious" | "Moderate" | "Liberal" | "Any";
    expectedMaritalStatus: MaritalStatus[];
    expectedEconomicalStatus?: EconomicalStatus[]; 
    generalQualities: string;
    ageRange: { min: number; max: number };
  };

  // --- System Metadata ---
  status: UserStatus; // Default: PENDING
  badge: VerificationBadge; // Default: NONE
  createdAt: Date;
  updatedAt: Date;
}