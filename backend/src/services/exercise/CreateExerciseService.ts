import prismaClient from "../../prisma";

interface ExerciseRequest{
    name: string;
    reps: string;
    time: string;
    observation: string;
    category_id: string;
}

class CreateExerciseService{
    async execute({ name, reps, time, observation, category_id }: ExerciseRequest){
        if(!name || !reps || !time || !observation || !category_id){
            throw new Error("incorrect data");
        }

        const exerciseAlreadyExists = await prismaClient.category.findFirst({
            where:{
                name: name
            }
        })

        if(exerciseAlreadyExists){
            throw new Error("Exercise already exists");
        }

        const exercise = await prismaClient.exercise.create({
            data:{
                name: name,
                reps: reps,
                time: time,
                observation: observation,
                category_id: category_id
            },
            select:{
                id: true,
                name: true,
                time: true,
                observation: true,
                category_id: true
            }
        })

        return exercise;
    }
}

export { CreateExerciseService }