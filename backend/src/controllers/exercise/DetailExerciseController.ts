import { Request, Response } from 'express';
import { DetailExerciseService } from '../../services/exercise/DetailExerciseService';

class DetailExerciseController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string;

        const detailExerciseService = new DetailExerciseService();

        const training = await detailExerciseService.execute({ id });

        return res.json(training)
    }
}

export { DetailExerciseController }