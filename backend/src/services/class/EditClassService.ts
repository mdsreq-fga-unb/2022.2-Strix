import prismaClient from "../../prisma";

interface EditClassRequest {
  classID: string;
  name: string;
  date: string;
  duration: string;
  time: string;
  studentID: string; // pode vir vazio
  studentName: string;
}

class EditClassService {
  async execute({
    classID,
    name,
    date,
    time,
    duration,
    studentID,
    studentName,
  }: EditClassRequest) {
    const foundClass = await prismaClient.class.findFirst({
      where: {
        id: classID,
      },
    });
    if (foundClass === undefined) {
      throw new Error("Cannot find AULA with id " + classID);
    }
    const original_studentID = foundClass.studentID;
    let idToChange : string;
    let nameToChange : string;
    if (studentID === undefined) {
      idToChange = original_studentID;
      nameToChange = foundClass.studentName;
    }
    else 
    {
      idToChange = studentID;
      nameToChange = studentName;
    }
    const edited = await prismaClient.class.update({
      where: {
        id: classID,
      },
      data: {
        name: name,
        date: date,
        duration: duration,
        time: time,
        // se não definir um novo studentsIDs, ele mantém o antigo, se definir um novo, ele faz a troca
        studentID: idToChange,
        studentName: nameToChange,
      },
      select: {
        name: true,
        date: true,
        duration: true,
        studentID: true,
      },
    });
    return edited;
  }
}

export { EditClassService };
