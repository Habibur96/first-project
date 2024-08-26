import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { TSemesterRegistraion } from './semesterRegistraion.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegistraion } from './semesterRegistraion.model';
import { query } from 'express';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistraion,
) => {
  const academicSemester = payload?.academicSemester;

  //check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found',
    );
  }

  //check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistraion.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    );
  }

  const result = await SemesterRegistraion.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistratonQuery = new QueryBuilder(
    SemesterRegistraion.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistratonQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistraion.findById(id);
  return result;
};
const updateSemesterRegistrationIntoDB = async (id: string) => {};
export const SemesterRegistraionService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
};
