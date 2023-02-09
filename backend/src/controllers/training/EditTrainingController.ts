import { Request, Response } from "express";
import { EditTrainingService } from "../../services/training/editTrainingService";

class EditTrainingController {
    async handle(req: Request, res: Response){
        const { id, name, exercise_id } = req.body;

        const editTrainingService = new EditTrainingService();
        const editTraining = await editTrainingService.execute({
            id,
            name,
            exercise_id
        });

        return res.json(editTraining);
    }
}

export { EditTrainingController }