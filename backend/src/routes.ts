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
import { DetailExerciseController } from './controllers/exercise/DetailExerciseController';
import { EditExerciseController } from './controllers/exercise/EditExerciseController';
import { RemoveExerciseController } from './controllers/exercise/RemoveExerciseController';

// -- Training -- 
import { CreateTrainingController } from './controllers/training/CreateTrainingController';
import { DetailTrainingController } from './controllers/training/DetailTrainingController';
import { ListTrainingController } from './controllers/training/ListTrainingController';


// -- GeneratePdf --
//import { GeneratePdfController } from './controllers/generatePdf/GeneratePdfController';
import { GeneratePdf } from './utils/generatePdf';
import { CreatePdfRoot } from './utils/createPdfRoot';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreatePendencyController } from './controllers/pendency/CreatePendencyController';
import { ListAllPendentStudentsController } from './controllers/pendency/ListAllPendentStudentsController';
import { ListPendencyController } from './controllers/pendency/ListPendencyController';
import { DetailPendencyController } from './controllers/pendency/DetailPendencyController';
import { DeletePendencyController } from './controllers/pendency/DeletePendencyController';
import { EditPendencyController } from './controllers/pendency/EditPendencyController';
import { SendEmail } from './utils/sendEmail';

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

// -- Rotas Exercise --
router.post('/exercises', isAuthenticated, new CreateExerciseController().handle)
router.get('/listExercises', isAuthenticated, new ListExerciseController().handle)
router.get('/exercise/detail', isAuthenticated, new DetailExerciseController().handle)
router.put('/updateExercise', isAuthenticated, new EditExerciseController().handle)
router.delete('/exerciseDelete', isAuthenticated, new RemoveExerciseController().handle)

// -- Rotas Training --
router.post('/training', isAuthenticated, new CreateTrainingController().handle)
router.get('/training/detail', isAuthenticated, new DetailTrainingController().handle)
router.get('/listTraining', isAuthenticated, new ListTrainingController().handle)

// -- Rotas GeneratePdf --
router.post('/generatePdf', new GeneratePdf().handle)
// -- Rotas Pendências --
router.post('/pendency', isAuthenticated, new CreatePendencyController().handle)
router.get('/listPendentStudents', isAuthenticated, new ListAllPendentStudentsController().handle)
router.get('/listAllPendencies', isAuthenticated, new ListPendencyController().handle)
router.get('/pendency/detail', isAuthenticated, new DetailPendencyController().handle)
router.delete('/deletePendency', isAuthenticated, new DeletePendencyController().handle)
router.put('/updatePendency', isAuthenticated, new EditPendencyController().handle)

// -- Rotas envio de treino --
router.post('/sendEmail', new SendEmail().handle);

// -- Rota CreatePdfRoot --
router.post('/createPdfRoot', new CreatePdfRoot().handle)

export { router };