import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStusent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    const zodparseData = studentValidationSchema.parse(studentData);
    const result = await studentServices.createStudentIntoDB(zodparseData);
    res.status(200).json({
      success: true,
      message: 'Students is created succesfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await studentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const studentControllers = {
  createStusent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
