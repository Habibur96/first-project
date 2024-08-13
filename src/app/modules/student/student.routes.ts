import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlwares/velidateRequest';
import { updateStudentValidationSchema } from './student.validation';
const router = express.Router();

router.get('/', studentControllers.getAllStudents);
router.get('/:id', studentControllers.getSingleStudent);
router.delete('/:id', studentControllers.deleteStudent);
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  studentControllers.updateStudent,
);

export const StudentRoutes = router;
