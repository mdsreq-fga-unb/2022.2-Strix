import prismaClient from "../../prisma";

interface StudentRequest {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  user_id: string;
}

class CreateStudentService {
  async execute({
    name,
    email,
    user_id,
    cpf,
    birthDate,
    phone,
  }: StudentRequest) {
    // Verificar se os dados foram enviados
    if (!email || !name || !cpf || !birthDate || !phone) {
      throw new Error("incorrect data");
    }

    // Verificar o dados do aluno
    if (
      name === "" ||
      email === "" ||
      cpf === "" ||
      birthDate === "" ||
      phone === ""
    ) {
      throw new Error("invalid data");
    }

    // Verificar se o email já está cadastrado no banco
    const emailAlreadyExists = await prismaClient.student.findFirst({
      where: {
        email: email,
      },
    });

    const phoneAlreadyExists = await prismaClient.student.findFirst({
        where: {
            phone: phone,
        },
    });

    const CPFalreadyExists = await prismaClient.student.findFirst({
        where: {
            cpf: cpf,
        },
    });


    if (emailAlreadyExists) {
      throw new Error("Email já cadastrado.");
    }
    if (phoneAlreadyExists) {
        throw new Error("Telefone já cadastrado.");
    }
    if (CPFalreadyExists) {
        throw new Error("CPF já cadastrado.");
    }

    // Cadastro de alunos no banco
    const student = await prismaClient.student.create({
      data: {
        name: name,
        email: email,
        cpf: cpf,
        birthDate: birthDate,
        phone: phone,
        user_id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        birthDate: true,
        phone: true,
        user_id: true,
      },
    });

    return student;
  }
}

export { CreateStudentService };
