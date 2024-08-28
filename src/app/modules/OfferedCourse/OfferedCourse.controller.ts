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

export const OfferedCourseControllers = {
  createOfferedCourse,
};
