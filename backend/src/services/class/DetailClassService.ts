import prismaClient from "../../prisma";

class DetailClassService {
  async execute(classID) {
    if (classID === undefined) {
      // não enviou no corpo da requisição um classID, então retornaremos TODAS as aulas
      const aulas = await prismaClient.class.findMany();
      return aulas;
    } else {
      // se enviou, vamos retornar a aula específica
      const aulaEncontrada = await prismaClient.class.findFirst({
        where: {
          id: classID,
        },
        select: {
          id: true,
          name: true,
          date: true,
          duration: true,
          studentID: true,
        },
      });
      return aulaEncontrada;
    }
  }
}

export { DetailClassService };
