import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../src/services/errors/AuthTokenError";

// Função para páginas que só usuários logados podem acessar.
export function canSSRAuth(fn){
    return async (ctx) => {
        const cookies = parseCookies(ctx);
        const token = cookies['@nextauth.token'];

        // Se não tem token, o usuário é redirecionado para a tela de login ('/')
        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }

        // Se tem o token, o usuário pode acessar a página
        try{
            return await fn(ctx);
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@nextauth.token');

                return{
                    redirect:{
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}