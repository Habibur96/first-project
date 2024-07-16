import { config } from 'dotenv';
import { TStudent } from '../student/sudent.interface';
import { UserModel } from './user.model';
import { TUser } from './user.interface';
import { StudentModel } from '../student/student.model';
import { TAcademicSemester } from '../academicSemester/academicSmester.interface';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  //if password is not given, user default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  const generatedStudentId = (payload: TAcademicSemester) => {};

  //set generated id
  userData.id = generatedStudentId(TAcademicSemester);

  //creae a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id; // ambading id
    studentData.user = newUser._id; // reference_id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
