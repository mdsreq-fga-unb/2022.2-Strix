import { Request, Response } from "express";
import { ListTrainingService } from "../../services/training/ListTrainingService";

class ListTrainingController{
    async handle(req: Request, res: Response){
        const listTrainingService = new ListTrainingService();

        const training = await listTrainingService.execute();

        return res.json(training);
    }
}

export { ListTrainingController }