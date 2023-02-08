import { Request, Response } from "express";
import { EditClassService } from "../../services/class/EditClassService";

// deve permitir editar TODOS os dados de aula.
class EditClassController {
  async handle(req: Request, res: Response) {
    const { classID, name, date, time, duration, studentID } = req.body; // Troca todo o vetor de alunos caso um novo seja passado.
    const editClassService = new EditClassService();
    return res.json(
      await editClassService.execute({ classID, name, date, time, duration, studentID })
    );
  }
}

export { EditClassController };
