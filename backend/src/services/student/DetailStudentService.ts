import prismaClient from "../../prisma";

interface StudentRequest {
  id: string;
}

class DetailStudentService {
  async execute({ id }: StudentRequest) {
    if (!id) {
      throw new Error("invalid id");
    }

    const student = await prismaClient.student.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        birthDate: true,
        phone: true,
      },
    });

    if (student !== null) {
      return student;
    } else {
      throw new Error("There is no student with that id");
    }
  }


}

export { DetailStudentService };
