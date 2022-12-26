import prismaClient from "../../prisma";

interface StudentRequest {
    name: string;
    email: string;
    id: string;
    cpf: string;
    phone: string;
    birthDate: string;
}

class EditStudentService{
    async execute({ id, name, email, cpf, phone, birthDate }: StudentRequest){
        if(!name || !email || !cpf || !phone || !birthDate) {
            throw new Error("invalid Data");
        }

        const student = await prismaClient.student.update({
            where:{
                id: id
            },
            data:{
                name: name,
                email: email,
                cpf: cpf,
                phone: phone,
                birthDate: birthDate
            }, 
            select:{
                name: true,
                email: true,
                id: true,
                cpf: true,
                phone: true,
                birthDate: true
            }
        })

        return student;
    }
}

export { EditStudentService }