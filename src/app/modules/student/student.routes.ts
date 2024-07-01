import express from 'express';

import { studentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', studentControllers.createStusent);
export const StudentRoutes = router