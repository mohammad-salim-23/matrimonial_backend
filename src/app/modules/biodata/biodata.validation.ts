import { z } from 'zod';

const siblingValidationSchema = z.object({
  relation: z.enum(["Brother", "Sister"]),
  maritalStatus: z.string(),
  educationalQualification: z.string().optional(),
  occupation: z.string().optional(),
});

const createBiodataValidationSchema = z.object({
  body: z.object({
    // Part 1: Basics & Personal
    gender: z.string().optional(),
    age: z.number().optional(),
    maritalStatus: z.string().optional(),
    bloodGroup: z.string().optional(),
    physicalStats: z.object({
      height: z.string(),
      weight: z.number(),
      skinTone: z.string(),
    }).optional(),

    // Part 2: Education & Occupation
    education: z.any().optional(),
    occupation: z.object({
      isExpat: z.boolean(),
      countryName: z.string().optional(),
      profession: z.string(),
      designation: z.string(),
    }).optional(),

    // Part 3: Family & Religion
    familyDetails: z.object({
      siblingsDetails: z.array(siblingValidationSchema).optional(),
      economicalStatus: z.string(),
      familySummary: z.string(),
    }).optional(),
    religion: z.any().optional(),
  }),
});

export const BiodataValidations = { createBiodataValidationSchema };