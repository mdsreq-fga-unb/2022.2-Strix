import prismaClient from "../../prisma";

class ListExerciseService{
    async execute(){
        const allExercises = await prismaClient.exercise.findMany({
            select:{
                id: true,
                name: true,
                reps: true,
                time: true,
                observation: true,
                category_name: true
            }
        })

        return allExercises;
    }
}

export { ListExerciseService }