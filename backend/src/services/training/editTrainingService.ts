import prismaClient from "../../prisma";

interface TrainingRequest {
    id: string;
    name: string;
    exercise_id: string[];
}

class EditTrainingService {
    async execute({ id, name, exercise_id }: TrainingRequest) {
        if (!id || !name || !exercise_id) {
            throw new Error('invalid data');
        }

        const training = await prismaClient.training.update({
            where:{
                id: id
            },
            data:{
                name: name,
                exercise_id: exercise_id
            },
            select:{
                id: true,
                name: true,
                exercise_id: true
            }
        });

        return training;
    }
}

export { EditTrainingService }