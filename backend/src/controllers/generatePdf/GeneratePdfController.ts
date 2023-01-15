import { Request, Response } from "express";
import { GeneratePdfService } from "../../services/generatePdf/GeneratePdfService";

class GeneratePdfController {
    async handle(req: Request, res: Response) {
        const generatePdfService = new GeneratePdfService();
        const generatePdf = await generatePdfService.execute();

        return res.json("pdf gerado!") 
    }
}

export { GeneratePdfController }