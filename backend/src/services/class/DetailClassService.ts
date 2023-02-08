import prismaClient from "../../prisma";

class DetailClassService {
  async execute(classID) {
    const aulaEncontrada = await prismaClient.class.findFirst({
      where: {
        id: classID,
      },
      select: {
        name: true,
        date: true,
        duration: true,
        studentsIDs: true
      }
    });
    return aulaEncontrada;
  }
}

export { DetailClassService };
