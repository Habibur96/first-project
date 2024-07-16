// import { userServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsyns';
import { AcademicSemesterServices } from './academicSemeser.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester is created succesfully',
    data: result,
  });
});

export const AcademicSemesterControlers = {
  createAcademicSemester,
};
