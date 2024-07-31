import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlwares/velidateRequest';
import {updateStudentValidationSchema} from './student.validation'
const router = express.Router();

router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deleteStudent);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  studentControllers.updateStudent,
);

export const StudentRoutes = router;
