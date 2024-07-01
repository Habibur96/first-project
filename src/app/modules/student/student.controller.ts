import { Request, Response } from 'express';
import { studentServices } from './student.service';



const createStusent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const result = await studentServices.createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentControllers ={
    createStusent
}
