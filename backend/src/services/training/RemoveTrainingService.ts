import prismaClient from "../../prisma";

interface TrainingRequest {
    training_id: string;
}

class RemoveTrainingService {
    async execute({ training_id }: TrainingRequest){
        const training = await prismaClient.training.delete({
            where:{
                id: training_id
            }
        })

        return training;
    }
}

export { RemoveTrainingService }