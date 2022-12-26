import { Request, Response } from "express";
import { RemoveStudentService } from "../../services/student/RemoveStudentService";

class RemoveStudentController{
    async handle(req: Request, res: Response){
        const { student_id } = req.body;

        const removeStudent = new RemoveStudentService(); 
        const student = await removeStudent.execute({
            student_id
        });

        return res.json(student);
    }
}

export { RemoveStudentController }