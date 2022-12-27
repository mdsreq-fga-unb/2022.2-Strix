import prismaClient from "../../prisma";

class ListStudentService{
    async execute(){
        const allStudents = await prismaClient.student.findMany({
            select:{
                id: true,
                name: true,
                cpf: true,
                email: true,
                birthDate: true,
                phone: true,
            }
        })

        return allStudents;
    }
}

export { ListStudentService }