import prismaClient from "../../prisma";

export class EditPendencyService {
  async execute({ pendencyId, valor, descricao }) {
    valor = parseFloat(valor);

    const toUpdate = await prismaClient.pendency.findFirst({
      where: {
        id: pendencyId,
      },
    });

    const oldPrice = toUpdate.price;
    const studentID = toUpdate.studentId;

    await prismaClient.pendency.update({
      where: {
        id: pendencyId,
      },
      data: {
        price: valor,
        description: descricao,
      },
    });

    const nova = await prismaClient.pendentStudent.findFirst({
      where: {
        studentId: studentID
      }
    })

    const novo_total = (nova.total_value - oldPrice) + valor;

    await prismaClient.pendentStudent.update({
      where: {
        studentId: studentID,
      },
      data: {
        total_value: novo_total
      }
    })

  }
}
