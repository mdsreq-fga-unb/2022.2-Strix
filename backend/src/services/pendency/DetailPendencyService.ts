import prismaClient from "../../prisma";

export class DetailPendencyService {
  async execute({ pendencyId }) {
    const pendency = await prismaClient.pendency.findFirst({
      where: {
        id: pendencyId,
      },
    });
    return pendency;
  }
}
