import { Schema, model } from 'mongoose';
import { BloodGroup, CreatedBy, EconomicalStatus, Gender, IBiodata, MaritalStatus, SkinTone, UserStatus, VerificationBadge } from './biodata.interface.js';

const siblingSchema = new Schema({
  relation: { type: String, enum: ["Brother", "Sister"], required: true },
  maritalStatus: { type: String, enum: Object.values(MaritalStatus), required: true },
  educationalQualification: { type: String },
  occupation: { type: String }
}, { _id: false });

const biodataSchema = new Schema<IBiodata>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    biodataType: { type: String, enum: ["Personal", "Family"], required: true },
    postedBy: { type: String, enum: Object.values(CreatedBy), required: true },
    
    privateInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      contactNumber: { type: String, required: true },
      guardianNumber: { type: String, required: true },
      guardianRelation: { type: String, required: true },
      // Added socialMedia field
      socialMedia: {
        facebook: { type: String },
        instagram: { type: String },
        linkedin: { type: String }
      },
      // Added documents field
      documents: {
        nidCardUrl: { type: String },
        studentIdCardUrl: { type: String },
        jobIdCardUrl: { type: String }
      }
    },

    gender: { type: String, enum: Object.values(Gender), required: true },
    age: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    maritalStatus: { type: String, enum: Object.values(MaritalStatus), required: true },
    bloodGroup: { type: String, enum: Object.values(BloodGroup), required: true },

    physicalStats: {
      height: { type: String, required: true },
      weight: { type: Number, required: true },
      skinTone: { type: String, enum: Object.values(SkinTone), required: true },
    },

    education: {
      ssc: { board: String, year: String, result: String },
      hsc: { board: String, year: String, result: String },
      graduation: {
        variety: { type: String, enum: ["Varsity", "Engineering", "Medical", "Graduate"], required: true },
        department: { type: String, required: true },
        institution: { type: String, required: true },
        passingYear: { type: String, required: true },
      },
    },

    occupation: {
      isExpat: { type: Boolean, default: false },
      countryName: { type: String },
      profession: { type: String, required: true },
      designation: { type: String, required: true },
      monthlyIncome: { type: String },
    },

    familyDetails: {
      father: { isAlive: { type: Boolean, default: true }, occupation: String },
      mother: { isAlive: { type: Boolean, default: true }, occupation: String },
      siblingsCount: { type: Number, default: 0 },
      siblingsDetails: [siblingSchema], // Array of siblings
      economicalStatus: { type: String, enum: Object.values(EconomicalStatus), required: true },
      familySummary: { type: String, required: true },
    },

    address: {
      present: {
        division: { type: String, required: true },
        district: { type: String, required: true },
        thana: { type: String, required: true },
        houseInfo: { type: String }
      },
      permanent: {
        division: { type: String, required: true },
        district: { type: String, required: true },
        thana: { type: String, required: true },
        houseInfo: { type: String }
      },
    },

    religion: {
      faith: { type: String, enum: ["Islam", "Hinduism", "Buddhism", "Christianity", "Other"], required: true },
      sectOrCaste: String,
      practiceLevel: { type: String, required: true },
      dailyLifeStyleSummary: { type: String, required: true },
      habits: [String],
      religiousLifestyleDetails: { type: String, required: true },
    },

    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.PENDING },
    badge: { type: String, enum: Object.values(VerificationBadge), default: VerificationBadge.NONE },
  },
  { timestamps: true }
);

export const Biodata = model<IBiodata>('Biodata', biodataSchema);