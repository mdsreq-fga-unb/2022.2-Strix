import { Request, Response } from "express";
import { z } from "zod";

const nodemailer = require("nodemailer");

class SendEmail {
  async handle(req: Request, res: Response) {
    const emailRequestBody = z.object({
      pathToPDF: z.string(),
      emailUsername: z
        .string()
        .email({ message: "Email do usuário inválido." }),
      emailPassword: z.string(),
      studentEmail: z.string().email({ message: "Email do aluno inválido." }),
    });

    const { pathToPDF, emailUsername, emailPassword, studentEmail } =
      emailRequestBody.parse(req.body);

    let transporter = nodemailer.createTransport({
      service: "Outlook365",
      host: "smtp.office365.com",
      port: "587",
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Servidor pronto para enviar email");
      }
    });

    let info = await transporter.sendMail({
      from: emailUsername,
      to: studentEmail,
      subject: "Treino de musculação",
      text: "Segue em anexo o arquivo PDF do seu treino.",
      attachments: [
        {
          path: pathToPDF,
        },
      ],
    });
    return res.json(info);
  }
}

export { SendEmail };
