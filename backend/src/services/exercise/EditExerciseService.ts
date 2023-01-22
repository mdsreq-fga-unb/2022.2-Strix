import prismaClient from "../../prisma";

interface ExerciseRequest {
    id: string;
    name: string;
    reps: string;
    time: string;
    observation: string;
    category_name: string;
}

class EditExerciseService {
    async execute({ id, name, reps, time, observation, category_name }: ExerciseRequest){
        if(!id || ! name || !reps || !time || !observation || !category_name){
            throw new Error('invalid data');
        }

        const exercise = await prismaClient.exercise.update({
            where:{
                id: id
            },
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
                category_name: true
            }
        });

        return exercise;
    }
}

export { EditExerciseService }