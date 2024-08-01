


import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().nonempty({ message: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father's contact number is required" }),
  motherName: z.string().nonempty({ message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .nonempty({ message: "Mother's contact number is required" }),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: "Local guardian's name is required" }),
  occupation: z
    .string()
    .nonempty({ message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .nonempty({ message: "Local guardian's contact number is required" }),
  address: z
    .string()
    .nonempty({ message: "Local guardian's address is required" }),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        message: "Gender must be 'male' 'female' or 'other'",
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z.string().nonempty({ message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .nonempty({ message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .nonempty({ message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .nonempty({ message: 'Permanent address is required' }),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()

    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()

    .optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z
    .string()

    .optional(),
  fatherOccupation: z
    .string()

    .optional(),
  fatherContactNo: z
    .string()

    .optional(),
  motherName: z
    .string()

    .optional(),
  motherOccupation: z
    .string()

    .optional(),
  motherContactNo: z
    .string()

    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z
    .string()

    .optional(),
  occupation: z
    .string()

    .optional(),
  contactNo: z
    .string()

    .optional(),
  address: z
    .string()

    .optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z
        .enum(['male', 'female', 'other'], {
          message: "Gender must be 'male' 'female' or 'other'",
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      contactNo: z
        .string()

        .optional(),
      emergencyContactNo: z
        .string()

        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()

        .optional(),
      permanentAddress: z
        .string()

        .optional(),
      guardian: updateGuardianValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
