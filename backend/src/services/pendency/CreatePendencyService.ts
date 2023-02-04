import prismaClient from "../../prisma";
import { DetailStudentService } from "../student/DetailStudentService";

interface PendencyType {
  price: number;
  description: string;
  studentId: string;
}

export class CreatePendencyService {
  async execute({ price, description, studentId }: PendencyType) {
    const pendency = await prismaClient.pendency.create({
      data: {
        price: price,
        description: description,
        studentId: studentId,
      },
    });

    const student = await prismaClient.student.findFirst({
      where: { id: studentId },
    });

    if (student === null || student === undefined) {
      throw new Error("studentID inválido no registro de pendência.");
    }

    // checar se já existe entrada na tabela secundária
    const isAny = await prismaClient.pendentStudent.findFirst({
      where: {
        studentId: studentId,
      },
    });

    if (isAny === null || isAny === undefined) {
      await prismaClient.pendentStudent.create({
        data: {
          studentId: studentId,
          name: student.name,
          total_value: price,
          qt_pendencies: 1,
        },
      });
    } else {
      let newTotal = isAny.total_value + price;
      let newQtd = isAny.qt_pendencies + 1;
      await prismaClient.pendentStudent.update({
        where: { studentId: studentId },
        data: {
          total_value: newTotal,
          qt_pendencies: newQtd,
        },
      });
    }

    return pendency;
  }
}
