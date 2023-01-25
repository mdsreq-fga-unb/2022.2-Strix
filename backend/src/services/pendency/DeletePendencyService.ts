import prismaClient from "../../prisma";

export class DeletePendencyService {
  async execute(pendencyId) {
    const deleted = await prismaClient.pendency.delete({
      where: {
        id: pendencyId,
      },
    });
    const valor = deleted.price;
    const studentID = deleted.studentId;
    const pendantTable = await prismaClient.pendentStudent.findFirst({
      where: {
        studentId: studentID,
      },
    });
    const pendantTableId = pendantTable.id;
    const novo_valor = pendantTable.total_value - valor;
    const novo_total = pendantTable.qt_pendencies - 1;
    if (novo_total === 0) {
      await prismaClient.pendentStudent.delete({
        where: {
          id: pendantTableId,
        },
      });
    } else {
      await prismaClient.pendentStudent.update({
        where: {
          id: pendantTableId,
        },
        data: {
          total_value: novo_valor,
          qt_pendencies: novo_total,
        },
      });
    }
    return deleted;
  }
}
