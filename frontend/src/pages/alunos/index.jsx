import {Fragment} from 'react';
import Head from 'next/head';
import {Header} from '../../components/Header';

export default function AlunosPage() {
    return (
        <Fragment>
            <Header/>
            <Head>
                <title>Strix - Alunos</title>
            </Head>
            <h1 className={'subtitle'}>Meus Alunos</h1>
        </Fragment>
    )
}
