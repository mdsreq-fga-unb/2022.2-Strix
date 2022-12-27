import {Fragment} from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

export function Header() {
    return(
        <Fragment>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <h1 className={styles.headerTitle}>WISE</h1>
                    <nav className={styles.menuNav}>
                        <Link href={'/financas'}>
                            Finanças
                        </Link>
                        <Link href={'/exercicios'}>
                            Exercícios
                        </Link>
                        <Link href={'/alunos'}>
                            Alunos
                        </Link>
                        <Link href={'/treinos'}>
                            Treino
                        </Link>
                        <Button variant={'text'} color={'inherit'}>
                            <LogoutIcon/>
                        </Button>
                    </nav>
                </div>
            </header>
        </Fragment>
    )
}