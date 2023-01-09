import prismaClient from "../../prisma";

interface ExerciseRequest {
    id: string;
}

class DetailExerciseService {
    async execute({ id }: ExerciseRequest){
        if(!id) {
            throw new Error('invalid id');
        } 

        const exercise = await prismaClient.exercise.findFirst({
            where:{
                id: id
            },
            select:{
                id: true,
                name: true,
                reps: true,
                time: true,
                observation: true,
                category_name: true,
            }
        })

        if (exercise !== null){
            return exercise;
        }else{
            throw new Error("There is no exercise with that id");
        }
    }
}

export { DetailExerciseService }