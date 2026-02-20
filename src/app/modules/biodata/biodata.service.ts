import { IBiodata, UserStatus } from "./biodata.interface.js";
import { Biodata } from "./biodata.model.js";

const saveBiodataChunk = async (userId: string, payload: Partial<IBiodata>) => {
  // Upsert ensures: update if exists, create if not
  const result = await Biodata.findOneAndUpdate(
    { userId },
    { $set: payload },
    { new: true, upsert: true, runValidators: true }
  ).lean();

  // --- Percentage Calculation Logic ---
  const sections = [
    { field: result.gender, weight: 1 },
    { field: result.physicalStats?.height, weight: 1 },
    { field: result.education?.graduation?.institution, weight: 1 },
    { field: result.occupation?.profession, weight: 1 },
    { field: result.familyDetails?.familySummary, weight: 1 },
    { field: result.address?.present?.district, weight: 1 },
    { field: result.address?.permanent?.district, weight: 1 },
    { field: result.religion?.faith, weight: 1 },
    { field: result.partnerPreference?.generalQualities, weight: 1 },
    { field: result.privateInfo?.contactNumber, weight: 1 },
  ];

  const totalWeight = sections.length;
  const filledWeight = sections.filter(sec => !!sec.field).length;

  const percentage = Math.round((filledWeight / totalWeight) * 100);

  return { result, percentage };
};

const getAllBiodataFromDB = async (query: Record<string, unknown>, user: any) => {
  const { 
    gender, minAge, maxAge, division, district, 
    variety, department, institution, religion, 
    occupation, searchTerm 
  } = query;

  const filter: any = { status: 'Approved' }; // Only show approved biodatas

  // Basic Filters
  if (gender) filter.gender = gender;
  if (religion) filter['religion.faith'] = religion;
  if (division) filter['address.permanent.division'] = division;
  if (district) filter['address.permanent.district'] = district;

  // Education Variety (Varsity, Engineering, Medical, Graduate)
  if (variety) filter['education.graduation.variety'] = variety;
  
  // Department Filter
  if (department) filter['education.graduation.department'] = { $regex: department, $options: 'i' };

  // Institution Filter
  if (institution) filter['education.graduation.institution'] = { $regex: institution, $options: 'i' };

  // Occupation/Profession Filter
  if (occupation) filter['occupation.profession'] = { $regex: occupation, $options: 'i' };

  // Age Range Filter logic
  if (minAge || maxAge) {
    filter.age = {};
    if (minAge) filter.age.$gte = Number(minAge);
    if (maxAge) filter.age.$lte = Number(maxAge);
  }

  // Multi-field Global Search
  if (searchTerm) {
    filter.$or = [
      { 'occupation.profession': { $regex: searchTerm, $options: 'i' } },
      { 'education.graduation.institution': { $regex: searchTerm, $options: 'i' } },
      { 'education.graduation.department': { $regex: searchTerm, $options: 'i' } },
      { 'address.permanent.district': { $regex: searchTerm, $options: 'i' } },
    ];
  }

  // Security: Hide privateInfo for anyone except Admin
  let projection = "";
  if (user?.role !== 'admin') {
    projection = "-privateInfo"; 
  }

  const result = await Biodata.find(filter)
    .select(projection)
    .populate('userId', 'name email')
    .sort('-createdAt')
    .lean();

  return result;
};

const getSingleBiodataFromDB = async (id: string,user:any) => {
 const query = Biodata.findById(id).populate('userId');

 //logic to hide private info based on role
 if(user?.role !== 'admin'){
  query.select("-privateInfo");
 }
 return await query;
};

const deleteBiodataFromDB = async (id: string) => {
  return await Biodata.findByIdAndUpdate(
    id,
    {status: UserStatus.REJECTED},
    {new: true, runValidators:true}
  )
};

export const BiodataServices = {
  saveBiodataChunk,
  getAllBiodataFromDB,
  getSingleBiodataFromDB,
  deleteBiodataFromDB,
};