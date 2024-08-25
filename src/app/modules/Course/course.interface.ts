import { Types } from 'mongoose';

export type TpreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: [TpreRequisiteCourses];
};

export type TCoursefaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
