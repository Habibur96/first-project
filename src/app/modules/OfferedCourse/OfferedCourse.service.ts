import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { SemesterRegistraion } from '../semesterRegestraion/semesterRegistraion.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;
  //check if the semester regesration id is exists!
  const isSemesterRegistrationExists =
    await SemesterRegistraion.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester regisraion not found!');
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  //check if the academic faculty is exists!
  const isAcademicFacultyExits =
  await AcademicFaculty.findById(academicFaculty);

if (!isAcademicFacultyExits) {
  throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found !');
}
  //check if the academic department is exists!
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found!');
  }

  //check if the course  is exists!
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
  }

  //check if the faculty  is exists!
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!');
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
