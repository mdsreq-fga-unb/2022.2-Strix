import { useContext, useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import CustomizedInputs from '../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../components/ui/Button';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event){

    if(email === '' || password === '') {
      //alert('Preencha os dados!')
      toast.error("Preencha todos os campos!");
      return;
    }

    event.preventDefault();
    let data = {
      email,
      password
    }

    await signIn(data);
  }

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

        <form onSubmit={handleLogin}>
          <CustomizedInputs
            size='small' 
            label={'Digite seu email'} 
            type={'text'} 
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={'password'} 
            label={'Senha'}
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

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