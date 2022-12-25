import { createContext, useState, useEffect } from 'react';
import { destroyCookie } from 'nookies';
import Router from 'next/router';

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

    async function signIn({ email, password }){
        if (typeof email === 'string' && typeof password === 'string'){
            console.log("Email: ", email);
            console.log("Senha: ", password);
            console.log(typeof email, typeof password)
            alert('Clicou no login');
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}