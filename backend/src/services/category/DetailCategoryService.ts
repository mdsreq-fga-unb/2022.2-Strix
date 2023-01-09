import prismaClient from "../../prisma";

interface CategoryRequest {
    id: string;
}

class DetailCategoryService{
    async execute({ id }: CategoryRequest){
        if(!id) {
            throw new Error('invalid id');
        }

        const category = await prismaClient.category.findFirst({
            where:{
                id: id
            },
            select:{
                id: true,
                name: true,
                description: true
            }
        })

        if (category !== null){
            return category;
        }else{
            throw new Error("There is no category with that id");
        }
    }
}

export { DetailCategoryService }