import { Request, Response } from 'express';
import { DetailTrainingService } from '../../services/training/DetailTrainingService';

class DetailTrainingController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string;

        const detailTrainingService = new DetailTrainingService();

        const training = await detailTrainingService.execute({ id });

        return res.json(training);
    }
}

export { DetailTrainingController }