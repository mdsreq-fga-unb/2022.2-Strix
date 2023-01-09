import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;
    description: string;
}

class CreateCategoryService{
    async execute({ name, description }: CategoryRequest){
        if(!name || !description){
            throw new Error("incorrect data");
        }

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where:{
                name: name
            }
        })

        if(categoryAlreadyExists){
            throw new Error("Category already exists");
        }

        const category = await prismaClient.category.create({
            data:{
                name: name,
                description: description,
            },
            select:{
                id: true,
                name: true,
                description: true,
            }
        })

        return category;

    }
}

export { CreateCategoryService }