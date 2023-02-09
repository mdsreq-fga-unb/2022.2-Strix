import { Request, Response } from "express";
import { RemoveTrainingService } from "../../services/training/RemoveTrainingService";

class RemoveTrainingControlller{
    async handle(req: Request, res: Response){
        const training_id = req.query.training_id as string;
        //const { training_id } = req.body;

        const removeTraining = new RemoveTrainingService();
        const training = await removeTraining.execute({
            training_id
        });

        return res.json(training);
    }
}

export { RemoveTrainingControlller }