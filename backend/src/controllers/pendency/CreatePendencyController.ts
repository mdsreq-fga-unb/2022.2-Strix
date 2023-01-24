import { Request, Response } from "express";
import { CreatePendencyService } from "../../services/pendency/CreatePendencyService";

export class CreatePendencyController {
  async handle(req: Request, res: Response) {
    const createPendencyService = new CreatePendencyService();
    const { price, description, studentId } = req.body;
    const pendency = await createPendencyService.execute({
      price,
      description,
      studentId,
    });
    return res.json(pendency);
  }
}
