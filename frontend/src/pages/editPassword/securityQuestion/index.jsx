import { useState } from 'react';
import Head from 'next/head';
import styles from '../../../../styles/Home.module.scss';
import CustomizedInputs from '../../../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../../../components/ui/Button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Router from 'next/router';

export default function SecurityQuestion() {
  const [answer, setAnswer] = useState('');

  const securityQuestion = 'Qual o nome da sua mãe?'
  const securityAnswer = 'Fulana'

  function handleSecurityQuestion(event){
    event.preventDefault()

    if(answer === securityAnswer) {
      Router.push('/editPassword')
      return
    }
    toast.error("Resposta incorreta!")

  }

  return (
    <>
    <Head>
      <title>Strix - Altere sua senha</title>
    </Head>

    <div className={styles.containerCenter}>
     
      <div className={styles.login}> 

        <Link href="/" className={styles.logo}>
          STRIX
        </Link>

        <form onSubmit={handleSecurityQuestion}>
          <CustomizedInputs
            size='small' 
            label={securityQuestion} 
            type={'text'} 
            value={answer}
            onChange={ (e) => setAnswer(e.target.value) }
          />

          <Button type='submit'>Continuar</Button> 
        </form>

        <Link href="/" className={styles.text}>
          Login
        </Link>
      </div>
    </div>
    </>
  )
}
