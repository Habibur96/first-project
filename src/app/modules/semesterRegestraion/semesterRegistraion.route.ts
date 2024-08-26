import express from 'express';
import validateRequest from '../../middlwares/velidateRequest';

import { SemesterRegistraionValidations } from './semesterRegistraion.validation';
import { SemesterRegistrationController } from './semesterRegistraion.controller';

const router = express.Router();

router.post(
  '/create-semester-regestration',
  validateRequest(
    SemesterRegistraionValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistraionValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const SemesterRegistrationRoutes = router;
