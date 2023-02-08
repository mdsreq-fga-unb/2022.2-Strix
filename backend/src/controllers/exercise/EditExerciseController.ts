import { Request, Response } from "express";
import { EditExerciseService } from "../../services/exercise/EditExerciseService";

class EditExerciseController{
    async handle(req: Request, res: Response){
        const { id, name, reps, time, observation, category_name } = req.body;
    
        const editExerciseService = new EditExerciseService();
        const editExercise = await editExerciseService.execute({
            id,
            name,
            reps,
            time,
            observation,
            category_name
        });
        
        return res.json(editExercise);

    }
}

export { EditExerciseController }