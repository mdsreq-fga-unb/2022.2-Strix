import { Request, Response } from "express";
import { ListAllPendentStudentsService } from "../../services/pendency/ListAllPendentStudentsService";

/**
 * Busca todos os alunos com pendências no banco de dados.
 */
export class ListAllPendentStudentsController {
  async handle(req: Request, res: Response) {
    const listAllService = new ListAllPendentStudentsService();
    const devedores = await listAllService.execute();
    return res.json(devedores);
  }
}