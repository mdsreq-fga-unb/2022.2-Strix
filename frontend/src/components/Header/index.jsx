import { useContext } from 'react';
import {Fragment} from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
    const { signOut } = useContext(AuthContext);
    return(
        <Fragment>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <h1 className={styles.headerTitle}>STRIX</h1>
                    <nav className={styles.menuNav}>
                        <Link href={'/financas'}>
                            Finanças
                        </Link>
                        <Link href={'/exercicios'}>
                            Exercícios
                        </Link>
                        <Link href={'/students'}>
                            Alunos
                        </Link>
                        <Link href={'/createTraining'}>
                            Treino
                        </Link>
                        <Button variant={'text'} color={'inherit'} onClick={signOut}>
                            <LogoutIcon/>
                        </Button>
                    </nav>
                </div>
            </header>
        </Fragment>
    )
}