import prismaClient from "../../prisma";
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest){
         // Verificar se o email ou a senha existe
         const user = await prismaClient.user.findFirst({
            where:{
                email: email,
                password: password
            }
        })

        if(!user){
            throw new Error("User/password incorrect");
        }

        // Gerando o token JWT para o usuário e devolução de dados do usuário (id, name e email)
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }    
}

export { AuthUserService };

/*
    - Gerar um token JWT e devolver os dados do usuário como id, name, email e o token jwt.
    - O token é composto por 3 partes: header, payload e assinatura. O header indica o tipo do token. O payload pode conter dados tais como id, nome etc. A assinatura cuida da autenticidade. 
    - Os dados do usuário devolvidos após a autenticação são id, name, email e token
*/