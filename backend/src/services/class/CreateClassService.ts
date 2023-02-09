import prismaClient from "../../prisma";

interface ClassRequest {
  name: string;
  date: string;
  duration: string;
  time: string;
  studentID: string; // pode vir vazio
  studentName: string;
}

class CreateClassService {
  async execute({ name, date, time, duration, studentID, studentName }: ClassRequest) {
    const aulaCriada = await prismaClient.class.create({
      data: {
        name,
        date,
        time,
        duration,
        studentID,
        studentName
      },
    });
    return aulaCriada;
  }
}

export { CreateClassService };
