//import { Password } from '@mui/icons-material';
import Head from 'next/head';
import styles from '../../../styles/Home.module.scss';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';

export default function SignUp() {
  return (
    <>
    <Head>
      <title>Strix - Faça seu cadastro</title>
    </Head>

    <div className={styles.containerCenter}>
     
      <div className={styles.login}> 

        <Link href="/" className={styles.subtitulo}>
          Cadastro de aluno
        </Link>

        <form>
        <CustomizedInputs size='small' label={'Nome completo'} type={'text'} required={true} />
          <CustomizedInputs 
          size='small' 
          type={"text"} 
          label={'Data de nascimento'} 
          // InputLabelProps={{
          //   shrink: true,
          // }}
          required={true} />
          <CustomizedInputs size='small' type={'text'} label={'Telefone'} required={true} />
          <CustomizedInputs size='small' type={'text'} label={'CPF'} required={true} />
          <CustomizedInputs size='small' type={'email'} label={'E-mail'} required={true} />
          <p className={styles.msg}>* Campo Obrigatório</p>
          <Button type='submit'>Cadastrar</Button> 
        </form>

        {/* <Link href="/" className={styles.text}>
          Esqueci minha senha
        </Link> */}
      </div>
    </div>
    </>
  )
}