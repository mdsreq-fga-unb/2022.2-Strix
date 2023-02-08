import { Request, Response } from "express";
import { CreateClassService } from "../../services/class/CreateClassService";

class CreateClassController {
  async handle(req: Request, res: Response) {
    const { name, date, duration, studentsIDs } = req.body;
    const createClassService = new CreateClassService();
    const aula = await createClassService.execute({
      name,
      date,
      duration,
      studentsIDs,
    });
    return res.json(aula);
  }
}

export { CreateClassController };
