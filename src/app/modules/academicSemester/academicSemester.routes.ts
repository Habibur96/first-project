import express from 'express';
import { AcademicSemesterControlers } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middlwares/velidateRequest';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemisterValidationSchema,
  ),
  AcademicSemesterControlers.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
