import {Fragment} from 'react';
import Head from 'next/head';
import {Header} from '../../components/Header';
import styles from './styles.module.scss';
import Button from '@mui/material/Button';

// vai ser dados da APIs
const alunos = [
    {
        'nome': 'Pedro',
        'email': 'pedro@pedro'
    },
    {
        'nome': 'Mário',
        'email': 'mario@mario'
    },
    {
        'nome': 'Bia',
        'email': 'bia@bia'
    },
    {
        'nome': 'Guilherme',
        'email': 'guilherme@guilherme'
    },
    {
        'nome': 'Israel',
        'email': 'israel@israel'
    },
    {
        'nome': 'Fulano',
        'email': 'fulano@fulano'
    },
    {
        'nome': 'Ciclano',
        'email': 'ciclano@ciclano'
    }
]

export default function AlunosPage() {
    return (
        <Fragment>
            <Header/>
            <Head>
                <title>Strix - Alunos</title>
            </Head>
            <div className={styles.alunosContainer}>
                <h1 className={styles.alunosTitle}>Meus Alunos</h1>
                <div className={styles.group}>
                    <div className={styles.alunosList}>
                        {alunos.map(aluno => (
                            <button className={styles.alunoItem}>
                                {aluno.nome}
                            </button>
                        ))};
                    </div>
                </div>
                <Button variant={'contained'} color={'info'}
                        className={styles.addAlunoButton} size={'large'}>Adicionar novo aluno</Button>
            </div>
        </Fragment>
    )
}
