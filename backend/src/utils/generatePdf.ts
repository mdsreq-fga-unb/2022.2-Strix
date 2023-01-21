import { Request, Response } from "express";
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
//import prismaClient from "../prisma";

class GeneratePdf {
    async handle(req: Request, res: Response) {
        //const exercise = await prismaClient.exercise.findMany();

        //const { name, listExercises, student }  = req.body;

        const name = 'Exercício com bicicleta';

        const student = 'Ricado Silva'

        const listExercises = [
            {
                "id": "53e6f92e-2c90-4c5c-9e57-486579407186",
                "name": "Biclicleta",
                "reps": "1",
                "time": "1h",
                "observation": "Seção de 1h com carga moderada.",
                "category_name": "Exercícios Aeróbicos" 
            },
            {
                "id": "c703bf7a-0eb0-40f8-ba80-37d2b8d6d274",
                "name": "bicicleta ergométrica",
                "reps": "1",
                "time": "50 min",
                "observation": "carga moderada",
                "category_name": "Exercícios Aeróbicos"
            },
        ]

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

        for await (let x of listExercises) {
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
                        { text: `${name}`, style: "header" },
                        { text: `Aluno: ${student}\n\n`, style: "header" },
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
                            {text: "Categoria do exercício", style: "columnsTitle"}], ...body
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

/*
    - generatePdf vai receber um objeto com o name, a lista de exercícios (array de objetos) e o aluno para o qual o treino vai ser enviado!

    {
        "name": "...",
        "student":  "...",
        "listExercises": [{..}, {..}]
    }

    - A requisição deve ser do tipo get.
*/