import { config } from 'dotenv';
import { TStudent } from '../student/sudent.interface';
import { UserModel } from './user.model';
import { TUser } from './user.interface';
import { StudentModel } from '../student/student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generatedStudentId } from './user.utilis';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  //if password is not given, user default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //find academic semester
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set generated id
  userData.id =await generatedStudentId(admissionSemester);
  //creae a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payload.id = newUser.id; // ambading id
    payload.user = newUser._id; // reference_id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
