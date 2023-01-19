import { Request, Response } from "express";
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import prismaClient from "../prisma";

class GeneratePdf {
    async handle(req: Request, res: Response) {
        const exercise = await prismaClient.exercise.findMany();

        const fonts = {
            Helvetica: {
              normal: 'Helvetica',
              bold: 'Helvetica-Bold',
              italics: 'Helvetica-Oblique',
              bolditalics: 'Helvetica-BoldOblique'
            }
          };

        const printer = new PdfPrinter(fonts);

        const body = [];

        for await (let x of exercise) {
            const rows = new Array();
            rows.push(x.name);
            rows.push(x.reps);
            rows.push(x.time);
            rows.push(x.observation);
            rows.push(x.category_name);

            body.push(rows);
        }

        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: 'Helvetica' },
            content: [
                {
                    columns: [
                        { text: "Exercícios Cadastrados", style: "header" },
                        { text: "Aluno: Fulano de tal\n\n", style: "header" },
                    ],
                },
                {
                    table: {
                        heights: function (row) {
                            return 35;
                        },
                        body: [
                            [{text: "Nome do exercício", style: "columnsTitle"},
                            {text: "Repetições", style: "columnsTitle"},
                            {text: "Duração", style: "columnsTitle"},
                            {text: "Observações", style: "columnsTitle"},
                            {text: "Categoria", style: "columnsTitle"}], ...body
                        ], 
                    }
                }
            ],
            styles: {
               header: {
                    fontSize: 18,
			        bold: true,
                    alignment: "center"
               },
               columnsTitle: {
                    fontSize: 11,
                    bold: true,
                    fillColor: "#48577E",
                    color: "#FFF",
                    alignment: "center",
                    margin: 10
               }
            }
        }

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

        const chunks = [];

        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });
        
        pdfDoc.end();

        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks);
            res.end(result) 
        });
    }
}

export { GeneratePdf }