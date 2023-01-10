import prismaClient from "../../prisma";

interface ExerciseRequest{
    name: string;
    reps: string;
    time: string;
    observation: string;
    category_name: string;
    [key: string]: string;
}

class CreateExerciseService{
    async execute({ name, reps, time, observation, category_name }: ExerciseRequest){
        if(!name || !reps || !time || !observation || !category_name){
            throw new Error("incorrect data");
        }

        const exerciseAlreadyExists = await prismaClient.exercise.findFirst({
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
                category_name: category_name
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

        return exercise;
    }
}

export { CreateExerciseService }