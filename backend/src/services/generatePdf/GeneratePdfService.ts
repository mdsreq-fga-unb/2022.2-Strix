import prismaClient from '../../prisma';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';

class GeneratePdfService {
    async execute() {

        const fonts = {
            Helvetica: {
              normal: 'Helvetica',
              bold: 'Helvetica-Bold',
              italics: 'Helvetica-Oblique',
              bolditalics: 'Helvetica-BoldOblique'
            }
          };

        const printer = new PdfPrinter(fonts);

        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: 'Helvetica' },
            content: [
                {text: "Meu primeiro relatório em pdf"}
            ],
        }

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

        pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf"));

        pdfDoc.end();
    }
}

export { GeneratePdfService }