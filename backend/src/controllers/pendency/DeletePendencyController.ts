import { Request, Response } from "express";
import { DeletePendencyService } from "../../services/pendency/DeletePendencyService";

export class DeletePendencyController {
  async handle(req: Request, res: Response) {
    const pendencyId = req.query.pendencyId;
    const service = new DeletePendencyService();
    return res.json(await service.execute(pendencyId));
  }
}