// import studentValidationSchema from './student.validation';
import { NextFunction } from 'express';
import { userServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStusent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodparseData = studentValidationSchema.parse(studentData);
    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControlers = {
  createStusent,
};
