import { Request, Response } from "express";
import { DeleteClassService } from "../../services/class/DeleteClassService";

class DeleteClassController {
  async handle(req: Request, res: Response) {
    const classID = req.query.classID;
    const deleteService = new DeleteClassService();
    return res.json(await deleteService.execute(classID));
  }
}

export { DeleteClassController };
