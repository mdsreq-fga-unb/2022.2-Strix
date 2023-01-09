import { Request, Response } from 'express';
import { DetailCategoryService } from '../../services/category/DetailCategoryService';

class DetailCategoryController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string;

        const detailCategoryService = new DetailCategoryService();

        const category = await detailCategoryService.execute({ id });

        return res.json(category)
    }
}

export { DetailCategoryController }