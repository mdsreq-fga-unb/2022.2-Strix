import { Request, Response } from "express";
import { CreateTrainingService } from "../../services/training/CreateTrainingService";

class CreateTrainingController{
    async handle(req: Request, res: Response){
        const { name, exercise_id } = req.body;

        const createTrainingService = new CreateTrainingService();
        const training = await createTrainingService.execute({
            name,
            exercise_id
        });

        return res.json(training);

    }
}

export { CreateTrainingController }