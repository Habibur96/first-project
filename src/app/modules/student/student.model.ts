import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,

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
    
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//Virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//pre save middleware/hook : will work on create()   save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'Pre hook : we will save data');
  //hashing password and save into db

  const user = this; //doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware/hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//Query Middleware

studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const StudentModel = model<TStudent>('Student', studentSchema);
