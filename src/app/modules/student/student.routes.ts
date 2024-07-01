import express from 'express';

import { studentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', studentControllers.createStusent);

router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleStudent);

export const StudentRoutes = router;
