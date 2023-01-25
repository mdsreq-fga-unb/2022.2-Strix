import { Request, Response } from "express";
import { DetailPendencyService } from "../../services/pendency/DetailPendencyService";

export class DetailPendencyController {
  async handle(req: Request, res: Response) {
    const service = new DetailPendencyService();
    const {pendencyId} = req.body;
    return res.json(await service.execute(pendencyId));
  }
}