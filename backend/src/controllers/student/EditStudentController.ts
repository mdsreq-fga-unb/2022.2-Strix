import { Request, Response } from "express";
import { EditStudentService } from "../../services/student/EditStudentService";

class EditStudentController{
    async handle(req: Request, res: Response){
        const { name, email, id, cpf, phone, birthDate  } = req.body;

        const editStudentService = new EditStudentService();
        const editStudent = await editStudentService.execute({
            name,
            email,
            id,
            cpf,
            phone,
            birthDate
        });

        return res.json(editStudent);

    }
}

export { EditStudentController }