import prismaClient from "../../prisma";

class DeleteClassService {
  async execute(classID: string) {
    const deleted = await prismaClient.class.delete({
      where: {
        id: classID,
      },
    });
    return deleted;
  }
}

export { DeleteClassService };
