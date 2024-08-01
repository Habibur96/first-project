import express from 'express';

import { createStudentValidationSchema } from './../student/student.validation';
import validateRequest from '../../middlwares/velidateRequest';
import { userControlers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userControlers.createStusent,
);

export const UserRoutes = router;
