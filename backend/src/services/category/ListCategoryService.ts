import prismaClient from "../../prisma";

class ListCategoryService{
    async execute(){
        const allCategories = await prismaClient.category.findMany({
            select:{
                id: true,
                name: true,
                description: true
            }
        })

        return allCategories;
    }
}

export { ListCategoryService }