import prismaClient from "../../prisma";

interface TrainingRequest{
    name: string;
    exercise_id: string[];
}

class CreateTrainingService{
    async execute({ name, exercise_id}: TrainingRequest){
        if(!name || !exercise_id){
            throw new Error("incorrect data");
        }

        const trainingAlreadyExists = await prismaClient.training.findFirst({
            where:{
                name: name
            }
        })

        if(trainingAlreadyExists) {
            throw new Error("Training already exists");
        } 

        if(name === '' || exercise_id.length === 0){
            throw new Error('invalid data')
        }

        const training = await prismaClient.training.create({
            data:{
                name: name,
                exercise_id: exercise_id,
            },
            select:{
                id: true,
                name: true,
                exercise_id: true
            }
        })

        return training;
    }
}

export { CreateTrainingService }