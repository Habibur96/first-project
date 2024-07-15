import Router from 'express';
import { StudentRoutes } from '../modules/student/student.routes';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const modulerRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

modulerRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
