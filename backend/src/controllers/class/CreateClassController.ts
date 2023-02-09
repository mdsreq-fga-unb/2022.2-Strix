import { Request, Response } from "express";
import { CreateClassService } from "../../services/class/CreateClassService";

class CreateClassController {
  async handle(req: Request, res: Response) {
    const { name, date, time, duration, studentID, studentName } = req.body;
    const createClassService = new CreateClassService();
    const aula = await createClassService.execute({
      name,
      date,
      duration,
      time,
      studentID,
      studentName,
    });
    return res.json(aula);
  }
}

export { CreateClassController };
