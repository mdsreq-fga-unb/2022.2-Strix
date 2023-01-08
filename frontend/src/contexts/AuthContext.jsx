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
            Router.push('/students');
        }catch(err){
            toast.error("Erro ao cadastrar!");
            console.log("erro ao cadastrar aluno ", err)
        }
    }

    async function studentIdState(id){
        setIdState(id);
    }

    async function updatedStudent({ name, email, cpf, phone, birthDate, id }){
        try{
            const response = await api.put('/updateStudent', {
              name,
              email,
              cpf,
              phone,
              birthDate,
              id
            })
            toast.success('Dados editado com sucesso!');
            Router.push('/students');
        }catch(error){
          toast.error("Erro ao editar!");
          console.log("erro ao cadastrar aluno ", error);
        }
    }

    async function deleteStudent({ student_id }){
        try{
            const response = await api.delete('/studentDelete', {
                params:{
                    student_id: student_id,
                }
            })
            toast.success('Aluno deletado com sucesso!');
            Router.push('/students');
        }catch(error){
            toast.error("Erro ao deletar aluno.");
            console.log('Erro ao remover aluno.', error)
        }
    }

    async function registerCategories({ name, description}){
        try{
            const response = await api.post('/categories', {
                name,
                description
            })

            toast.success('Categoria cadastrada com sucesso!');
        }catch(err){
            toast.error("Erro ao cadastrar categoria!");
            console.log("erro ao cadastrar categoria ", err)
        }
    }

    async function registerExercise({ name, reps, time, observation, category_name }){
        try{
            const response = await api.post('/exercises', {
                name,
                reps,
                time,
                observation,
                category_name
            })

            toast.success('Exercício cadastrado com sucesso!');
        }catch(err){
            toast.error("Erro ao cadastrar exercício!");
            console.log("erro ao cadastrar exercício ", err)
        }
    }
    
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, registerStudent, studentIdState, idState, updatedStudent, deleteStudent, registerCategories, registerExercise }}>
            {children}
        </AuthContext.Provider>
    )
}