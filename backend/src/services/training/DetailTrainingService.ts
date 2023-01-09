import prismaClient from "../../prisma";

interface TrainingRequest {
    id: string;
}

class DetailTrainingService {
    async execute({ id }: TrainingRequest){
        if(!id) {
            throw new Error('invalid id');
        }

        const training = await prismaClient.training.findFirst({
            where:{
                id: id
            },
            select:{
                id: true,
                name: true,
                exercise_id: true
            }
        })
        
        if (training !== null){
            return training;
        }else{
            throw new Error("There is no training with that id");
        }
    }
}

export { DetailTrainingService }