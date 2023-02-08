import prismaClient from "../../prisma";

interface EditClassRequest {
  classID: string;
  name: string;
  date: string;
  duration: string;
  studentsIDs: string[]; // pode vir vazio
}

class EditClassService {
  async execute({
    classID,
    name,
    date,
    duration,
    studentsIDs,
  }: EditClassRequest) {
    const foundClass = await prismaClient.class.findFirst({
      where: {
        id: classID,
      },
    });
    if (foundClass === undefined) {
      throw new Error("Cannot find AULA with id " + classID);
    }
    const original_studentsID = foundClass.studentsIDs;
    const edited = await prismaClient.class.update({
      where: {
        id: classID,
      },
      data: {
        name: name,
        date: date,
        duration: duration,
        // se não definir um novo studentsIDs, ele mantém o antigo, se definir um novo, ele faz a troca
        studentsIDs:
          studentsIDs === undefined ? original_studentsID : studentsIDs,
      },
      select: {
        name: true,
        date: true,
        duration: true,
        studentsIDs: true,
      },
    });
    return edited;
  }
}

export { EditClassService };
