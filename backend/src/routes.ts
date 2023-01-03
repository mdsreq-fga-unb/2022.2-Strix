import { Router } from 'express';

// -- User --
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

// -- Student --
import { CreateStudentController } from './controllers/student/CreateStudentController';
import { ListStudentController } from './controllers/student/ListStudentController';
import { RemoveStudentController } from './controllers/student/RemoveStudentController';
import { EditStudentController } from './controllers/student/EditStudentController';
import { DetailStudentController } from './controllers/student/DetailStudentController';

// -- Category --
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { DetailCategoryController } from './controllers/category/DetailCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

// -- Exercise --
import { CreateExerciseController } from './controllers/exercise/CreateExerciseController';
import { ListExerciseController } from './controllers/exercise/ListExerciseController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// -- Rotas User --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- Rotas Student --
router.post('/students', isAuthenticated, new CreateStudentController().handle)
router.get('/listStudents', isAuthenticated, new ListStudentController().handle)
router.delete('/studentDelete', isAuthenticated, new RemoveStudentController().handle)
router.put('/updateStudent', isAuthenticated, new EditStudentController().handle)
router.get('/student/detail', isAuthenticated, new DetailStudentController().handle)

// -- Rotas Category --
router.post('/categories', isAuthenticated, new CreateCategoryController().handle)
router.get('/category/detail', isAuthenticated, new DetailCategoryController().handle)
router.get('/listCategories', isAuthenticated, new ListCategoryController().handle)

// -- Rota Exercise --
router.post('/exercises', isAuthenticated, new CreateExerciseController().handle)
router.get('/listExercises', isAuthenticated, new ListExerciseController().handle)

export { router };