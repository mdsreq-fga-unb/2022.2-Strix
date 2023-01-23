import { Request, Response } from "express";
import { ListPendencyService } from "../../services/pendency/ListPendencyService";

export class ListPendencyController {
  async handle(req: Request, res: Response) {
    const service = new ListPendencyService();
    const allPendencies = await service.execute();
    return res.json(allPendencies);
  }
}