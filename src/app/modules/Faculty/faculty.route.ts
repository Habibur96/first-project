import express from 'express';

import { FacultyControllers } from './faculty.controller';
import { studentValidations, updateFacultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middlwares/velidateRequest';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(
    studentValidations.createFacultyValidationSchema,
  ),
  FacultyControllers.createFaculty,
);
router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;