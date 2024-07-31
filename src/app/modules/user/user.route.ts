import express from 'express';
import { userControlers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlwares/velidateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userControlers.createStusent,
);
export const UserRoutes = router;
