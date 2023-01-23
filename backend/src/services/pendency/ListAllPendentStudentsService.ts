import prismaClient from "../../prisma";

export class ListAllPendentStudentsService {
  async execute() {
    const pendentStudents = await prismaClient.pendentStudent.findMany({
      where: {},
    });
    if (pendentStudents == null || pendentStudents == undefined) {
      console.log("no pendent students");
      return {};
    }
    const res = [];
    pendentStudents.map((p) => {
      res.push({
        id: p.id,
        nome: p.name,
        qtd_pendencias: p.qt_pendencies,
        saldo_devedor: p.total_value,
        studentId: p.studentId,
      });
    });
    return res;
  }
}
