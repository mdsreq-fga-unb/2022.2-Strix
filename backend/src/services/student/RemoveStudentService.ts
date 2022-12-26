import prismaClient from "../../prisma";

interface StudentRequest {
    student_id: string;
}

class RemoveStudentService {
    async execute({ student_id }: StudentRequest){
        const student = await prismaClient.student.delete({
            where:{
                id: student_id
            }
        })

        return student;
    }
}

export { RemoveStudentService }