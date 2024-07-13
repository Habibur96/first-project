import { NextFunction, RequestHandler } from 'express';
import { studentServices } from './student.service';
import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students are retrieved succesfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await studentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student retrieved succesfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await studentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student deleted succesfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
