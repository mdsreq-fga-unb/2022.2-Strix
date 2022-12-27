import { Request, Response } from "express";
import { ListStudentService } from "../../services/student/ListStudentService";

class ListStudentController{
    async handle(req: Request, res: Response){
        const listStudentService = new ListStudentService();

        const student = await listStudentService.execute();

        return res.json(student);
    }
}

export { ListStudentController }