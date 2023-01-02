import { Request, Response } from "express";
import { CreateExerciseService } from "../../services/exercise/CreateExerciseService";

class CreateExerciseController {
    async handle(req: Request, res: Response){
        const { name, reps, time, observation, category_id } = req.body;

        const createExerciseService = new CreateExerciseService();
        const exercise = await createExerciseService.execute({
            name,
            reps,
            time,
            observation,
            category_id
        });

        return res.json(exercise);
    }
}

export { CreateExerciseController }