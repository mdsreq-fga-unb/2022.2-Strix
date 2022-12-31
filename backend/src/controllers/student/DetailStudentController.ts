import { Request, Response } from 'express';
import { DetailStudentService } from '../../services/student/DetailStudentService';

class DetailStudentController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string;

        const detailStudentService = new DetailStudentService();

        const student = await detailStudentService.execute({ id });

        return res.json(student)
    }
}

export { DetailStudentController }