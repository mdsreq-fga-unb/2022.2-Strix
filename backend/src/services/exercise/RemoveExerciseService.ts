import prismaClient from "../../prisma";

interface ExerciseRequest {
    exercise_id: string;
}

class RemoveExerciseService {
    async execute({ exercise_id }: ExerciseRequest){
        const exercise = await prismaClient.exercise.delete({
            where:{
                id: exercise_id
            }
        })

        return exercise;
    }
}

export { RemoveExerciseService }