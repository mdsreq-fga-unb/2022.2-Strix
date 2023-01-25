import { Request, Response } from "express";
import { EditPendencyService } from "../../services/pendency/EditPendencyService";

export class EditPendencyController {
  async handle(req: Request, res: Response) {
    const service = new EditPendencyService();
    let { pendencyId, valor, descricao } = req.body;
    valor = parseFloat(valor);
    return res.json(await service.execute({ pendencyId, valor, descricao }));
  }
}
