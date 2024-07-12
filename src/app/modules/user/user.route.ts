import express from 'express';
import { userControlers } from './user.controller';
const router = express.Router();


router.post('/create-student', userControlers.createStusent);
export const UserRoutes = router
