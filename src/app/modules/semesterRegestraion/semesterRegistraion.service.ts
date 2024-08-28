import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { TSemesterRegistraion } from './semesterRegistraion.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegistraion } from './semesterRegistraion.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistraionStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistraion,
) => {
  const academicSemester = payload?.academicSemester;
  //check if there any registered semester that is already 'UPCOMING' or 'ONGONING'
  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistraion.findOne(
    {
      $or: [
        { status: RegistraionStatus.UPCOMING },
        { status: RegistraionStatus.ONGOING },
      ],
    },
  );
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester`,
    );
  }

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
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistraion>,
) => {
  //check if the requested registered semester is exists

  //check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistraion.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found!');
  }

  //if the requesed semester regisraion is ended, we will no update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requesedStatus = payload?.status;

  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  //UPCOMING ----> ONGONING ----> ENDED

  if (
    currentSemesterStatus === RegistraionStatus.UPCOMING &&
    requesedStatus === RegistraionStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requesedStatus}`,
    );
  }

  const result = await SemesterRegistraion.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const SemesterRegistraionService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
};
