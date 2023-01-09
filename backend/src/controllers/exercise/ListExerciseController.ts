import { Request, Response } from "express";
import { ListExerciseService } from "../../services/exercise/ListExerciseService";

class ListExerciseController{
    async handle(req: Request, res: Response){
        const listExerciseService = new ListExerciseService();

        const exercise = await listExerciseService.execute();

        return res.json(exercise);
    }
}

export { ListExerciseController }