import { Request, Response } from "express";
import { CreateStudentService } from "../../services/student/CreateStudentService";

class CreateStudentController {
    async handle(req: Request, res: Response) {
        const { name, email, user_id, cpf, birthDate, phone } = req.body;

        const createStudentService = new CreateStudentService();
        const student = await createStudentService.execute({
            name,
            email,
            user_id,
            cpf,
            birthDate,
            phone
        });

        return res.json(student);
    }
}

export { CreateStudentController }