import prismaClient from "../../prisma";

interface StudentRequest{
    name: string;
    email: string;
    cpf: string;
    birthDate: string;
    phone: string;
    user_id: string;
}

class CreateStudentService{
    async execute({ name, email, user_id, cpf, birthDate, phone }: StudentRequest){
        // Verificar se os dados foram enviados
        if(!email || !name || !cpf || !birthDate || !phone) {
            throw new Error("incorrect data");
        }

        // Verificar se o email já está cadastrado no banco
        const studentAlreadyExists = await prismaClient.student.findFirst({
            where:{
                email: email
            }
        })

        if(studentAlreadyExists) {
            throw new Error("Student already exists");
        } 

        // Verificar o dados do aluno
        if(name === '' || email === '' || cpf === '' || birthDate === '' || phone === ''){
            throw new Error('invalid data')
        }

        // Cadastro de alunos no banco
        const student = await prismaClient.student.create({
            data:{
                name: name,
                email: email,
                cpf: cpf,
                birthDate: birthDate,
                phone: phone,
                user_id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true,
                cpf: true,
                birthDate: true,
                phone: true,
                user_id: true,  
            }
        })

        return student;
    }
}

export { CreateStudentService }