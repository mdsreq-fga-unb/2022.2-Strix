import prismaClient from "../../prisma";

interface ClassRequest {
  name: string;
  date: string;
  duration: string;
  studentsIDs: string[]; // pode vir vazio
}

class CreateClassService {
  async execute({ name, date, duration, studentsIDs }: ClassRequest) {
    const aulaCriada = await prismaClient.class.create({
      data: {
        name,
        date,
        duration,
        studentsIDs
      },
    });
    return aulaCriada;
  }
}

export { CreateClassService };
