import { academicSemesterCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from './academicSmester.interface';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
