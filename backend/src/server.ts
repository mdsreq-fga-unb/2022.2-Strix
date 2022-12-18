import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use((erro: Error, req: Request, res: Response, next: NextFunction) => {
    if(erro instanceof Error) {
        // Se for uma instância de um error
        return res.status(400).json({
            error: erro.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(3333, () => console.log('servidor online!'));