// import studentValidationSchema from './student.validation';
import { NextFunction } from 'express';
import { userServices } from './user.service';

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
    res.status(200).json({
      success: true,
      message: 'Students is created succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControlers = {
  createStusent,
};
