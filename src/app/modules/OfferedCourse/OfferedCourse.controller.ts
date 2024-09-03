import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsyns';
import { sendResponse } from '../../utils/sendResponse';
import { OfferedCourseServices } from './OfferedCourse.service';
import { Request, Response } from 'express';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is created successfully !',
    data: result,
  });
  return result;
});

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourseIntoBD(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse updated successfully!',
    data:result
  });
});
export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse
};
