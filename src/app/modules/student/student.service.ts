import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppErrors';
import { UserModel } from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './sudent.interface';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = StudentModel.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    })),
  });

  //Filterigng
  const excluedFields = ['searchTerm', 'sort', 'limit'];
  excluedFields.forEach((el) => delete queryObj[el]);

  const filterquery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery =  filterquery.sort(sort);

  let limit = 1;
  if (query.limit) {
    limit = query.limit as number
  }
  const limitQuery = await sortQuery.limit(limit)
  
    
    return limitQuery;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudent } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudent,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const studentServices = {
  getAllStudentsFromDB,
  updateStudentIntoDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
