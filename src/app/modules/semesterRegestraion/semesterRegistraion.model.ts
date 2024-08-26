import mongoose, { Schema } from 'mongoose';
import { TSemesterRegistraion } from './semesterRegistraion.interface';

import { SemesterRegistraionStatus } from './semesterRegistration.constant';

const semesterRegistraionSchema = new mongoose.Schema<TSemesterRegistraion>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegistraionStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistraion = mongoose.model<TSemesterRegistraion>(
  'SemesterRegistraion',
  semesterRegistraionSchema,
);
