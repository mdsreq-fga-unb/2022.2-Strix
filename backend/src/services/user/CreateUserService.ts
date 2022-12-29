import prismaClient from '../../prisma';

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        // Verificar se o email foi enviado
        if(!email) {
            throw new Error("Email incorrect");
        }

        // Verificar se o email já está cadastrado no banco
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists) {
            throw new Error("User already exists");
        } 

        // Cadastro de usuário no banco
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: password,
            },
            select:{
               id: true,
               name: true,
               email: true,
            }
        })

        return user;
    }
}

export { CreateUserService }

/* 
    - Não é possível cadastrar dois usuários no banco que possuem o mesmo email. 
    - O usuário vai ter fornecer o name, email e password para cadastro.
    - A requisição de cadastro de usuário vai retornar o id, name e email.
*/