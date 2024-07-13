// import studentValidationSchema from './student.validation';
import { RequestHandler } from 'express';
import { userServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStusent: RequestHandler = async (req, res, next) => {
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
