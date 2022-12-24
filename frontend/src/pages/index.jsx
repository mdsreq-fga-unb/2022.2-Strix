//import { Password } from '@mui/icons-material';
import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import CustomizedInputs from '../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <Head>
      <title>Strix - Faça seu login</title>
    </Head>

    <div className={styles.containerCenter}>
     
      <div className={styles.login}> 

        <Link href="/" className={styles.logo}>
          WISE
        </Link>

        <form>
          <CustomizedInputs size='small' label={'Digite seu email'} type={'text'} />
          <CustomizedInputs size='small' type={'password'} label={'Senha'} />
          <Button type='submit'>Acessar</Button> 
        </form>

        <Link href="/" className={styles.text}>
          Esqueci minha senha
        </Link>
      </div>
    </div>
    </>
  )
}