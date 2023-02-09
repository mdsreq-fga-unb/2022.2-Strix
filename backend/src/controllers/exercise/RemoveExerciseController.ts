import { Request, Response } from "express";
import { RemoveExerciseService } from "../../services/exercise/RemoveExerciseService";

class RemoveExerciseController{
    async handle(req: Request, res: Response){
        const exercise_id = req.query.exercise_id as string;

        const removeExercise = new RemoveExerciseService();
        const exercise = await removeExercise.execute({
            exercise_id
        });

        return res.json(exercise);

    }
}

export { RemoveExerciseController }