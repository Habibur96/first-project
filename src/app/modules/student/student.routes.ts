import express from 'express';

import { studentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', studentControllers.createStusent);

router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deleteStudent);

export const StudentRoutes = router;
