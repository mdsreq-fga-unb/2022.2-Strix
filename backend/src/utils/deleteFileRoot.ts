import { Request, Response } from "express";
import fs from 'fs';

class DeleteFileRoot {
    async handle(req: Request, res: Response) {
        fs.unlink('Treino.pdf', (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Arquivo removido com sucesso!');
          });
    }
}

export { DeleteFileRoot }