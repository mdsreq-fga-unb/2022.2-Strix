import prismaClient from "../../prisma";

interface ClassRequest {
  name: string;
  date: string;
  duration: string;
  time: string;
  studentID: string; // pode vir vazio
}

class CreateClassService {
  async execute({ name, date, time, duration, studentID }: ClassRequest) {
    const aulaCriada = await prismaClient.class.create({
      data: {
        name,
        date,
        time,
        duration,
        studentID,
      },
    });
    return aulaCriada;
  }
}

export { CreateClassService };
