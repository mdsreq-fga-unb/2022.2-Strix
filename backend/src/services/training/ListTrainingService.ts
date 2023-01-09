import prismaClient from "../../prisma";

class ListTrainingService{
    async execute(){
        const allTraining = await prismaClient.training.findMany({
            select:{
                id: true,
                name: true,
                exercise_id: true,
            }
        })  

        return allTraining;
    }
}

export { ListTrainingService }