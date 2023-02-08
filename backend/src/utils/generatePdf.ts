import { Request, Response } from "express";
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

class GeneratePdf {
    async handle(req: Request, res: Response) {
        const { name, student, listExercises } = req.body;

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
                        { text: `Treino: ${name}`, style: "header" },
                        { text: `Aluno(a): ${student}\n\n`, style: "header" },
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
            //res.send(result)
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