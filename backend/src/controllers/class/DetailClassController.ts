import { Request, Response } from "express";
import { DetailClassService } from "../../services/class/DetailClassService";

// recebe somente o id da aula no body
class DetailClassController {
  async handle(req: Request, res: Response) {
    const {classID} = req.body;
    const detailClassService = new DetailClassService();
    return res.json(await detailClassService.execute(classID))
  }
}

export { DetailClassController };
