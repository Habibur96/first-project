import express from 'express';

import { OfferedCourseControllers } from './OfferedCourse.controller';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import validateRequest from '../../middlwares/velidateRequest';

const router = express.Router();

router.get('/', );

router.get('/:id', );

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  
);

router.delete('/:id', );

export const offeredCourseRoutes = router;
