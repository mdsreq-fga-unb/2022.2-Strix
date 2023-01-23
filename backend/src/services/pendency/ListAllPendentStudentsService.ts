import prismaClient from "../../prisma";
import { DetailStudentService } from "../student/DetailStudentService";

export class ListAllPendentStudentsService {
  async execute() {
    const pendentStudents = await prismaClient.pendentStudent.findMany({
      where: {}
    })
    if (pendentStudents == null || pendentStudents == undefined) {
      console.log("no pendent students");
      return {};
    }
    const res = [];
    pendentStudents.map(p => {
      const nome = p.name;
      const valor = p.total_value;
      const qtd = p.qt_pendencies;
      res.push({"id": p.id, "nome": nome, "qtd_pendencias":qtd, "saldo_devedor":valor});
    })
    return res;
  }
}
