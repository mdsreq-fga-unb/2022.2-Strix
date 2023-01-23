import prismaClient from "../../prisma";

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
    return pendency;
  }
}
