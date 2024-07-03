import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, 'Password can not be more than 20 charters'],
  },
  name: { type: userNameSchema, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImage: { type: String },
  isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
});

//pre save middleware/hook : will work on create()   save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'Pre hook : we will save data');
  //hashing password and save into db

  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next()
});

//post save middlewere/hook
studentSchema.post('save', function () {
  console.log(this, 'Post hook : we saved our data');
});

export const StudentModel = model<Student>('Student', studentSchema);
