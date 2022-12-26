import Button from '@mui/material/Button';
//import styles from './styles.module.scss';
import Head from 'next/head';
import { canSSRAuth } from '../../../utils/canSSRAuth';

export default function StudentDash() {
  return (
    <>
    <Head>
      <title>WISE - Painel do aluno</title>
    </Head>
    <div>
      <h1>WISE - Painel do aluno</h1>
      <Button variant="contained">aluno</Button>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
      props: {}
  }
})