/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from 'dotenv';
import { TStudent } from '../student/sudent.interface';
import { UserModel } from './user.model';
import { TUser } from './user.interface';
import { StudentModel } from '../student/student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generatedStudentId } from './user.utilis';
import mongoose from 'mongoose';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  //if password is not given, user default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  //find academic semester
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    userData.id = await generatedStudentId(admissionSemester);
    //create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });
    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //set id, _id as user
    payload.id = newUser[0].id; // ambading id
    payload.user = newUser[0]._id; // reference_id

    //create a student(transaction-2)
    const newStudent = await StudentModel.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
};
