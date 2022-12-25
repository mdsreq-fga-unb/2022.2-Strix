import { Router } from 'express';

// -- User --
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

// -- Student --
import { CreateStudentController } from './controllers/student/CreateStudentController';
import { ListStudentController } from './controllers/student/ListStudentController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// -- Rotas User --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- Rotas Student --
router.post('/students', isAuthenticated, new CreateStudentController().handle)
router.get('/listStudents', isAuthenticated, new ListStudentController().handle)

export { router };