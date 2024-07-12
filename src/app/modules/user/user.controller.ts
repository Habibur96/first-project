
// import studentValidationSchema from './student.validation';
import { userServices } from './user.service';

const createStusent = async (req: Request, res: Response) => {
  try {
    const {password, student: studentData } = req.body;

    // const zodparseData = studentValidationSchema.parse(studentData);
    const result = await userServices.createStudentIntoDB(password, studentData);
    res.status(200).json({
      success: true,
      message: 'Students is created succesfully',
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
  
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const  userControlers = {
    createStusent
}