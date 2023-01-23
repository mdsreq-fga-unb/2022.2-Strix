import prismaClient from "../../prisma";

export class ListPendencyService {
  async execute() {
    return await prismaClient.pendency.findMany({
      where: {}
    })
  }
}