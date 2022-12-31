import { createContext, useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';

export const AuthContext = createContext({})

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch {
        console.log('erro ao deslogar');
    }
}

export function AuthProvider({ children }){
    const [user, setUser] = useState();
    const isAuthenticated = !!user;
    const [idState, setIdState] = useState('');

    useEffect(() => {
        // Tentar pegar algo no cookie
        const { '@nextauth.token': token } = parseCookies();
        if(token){
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            }).catch(() => {
                // Se deu erro deslogamos o user
                signOut();
            })
        }

    }, [])

    async function signIn({ email, password }){
        //if (typeof email === 'string' && typeof password === 'string'){}
        try{
            const response = await api.post('/session', {
                email,
                password
            });
            // console.log(response.data);

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expira em 1 mês
                path: "/" // Quais caminhos terão acesso ao cookie
            });

            setUser({
                id,
                name,
                email,
            });

            // Passar para as próximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            toast.success('Logado com sucesso!');

            Router.push('/students');

        }catch(err){
            toast.error("Erro ao acessar!");
            console.log("Erro ao acessar ", err);
        }
    }

    async function registerStudent({ name, birthDate, phone, cpf, email, user_id }){
        try{
            const response = await api.post('/students', {
                name,
                birthDate,
                phone,
                cpf,
                email,
                user_id
            })

            toast.success('Aluno cadastrado com sucesso!');
            Router.push('/studentDash');
        }catch(err){
            toast.error("Erro ao cadastrar!");
            console.log("erro ao cadastrar aluno ", err)
        }
    }

    async function studentIdState(id){
        setIdState(id);
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, registerStudent, studentIdState, idState }}>
            {children}
        </AuthContext.Provider>
    )
}