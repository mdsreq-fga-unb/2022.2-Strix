import { useContext, useState } from 'react';
import Head from 'next/head';
import styles from '../../../styles/Home.module.scss';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import Image from 'next/image';
import logoImg from '../../../public/logo-3.png';

export default function EditPassword() {
  const { editPassword } = useContext(AuthContext)

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  async function handlePassword(event){
    event.preventDefault()
    
    if(password === '' || passwordConfirm === '') {
      toast.error("Preencha todos os campos!")
      return
    }

    if(password !== passwordConfirm) {
      toast.error("As senhas não são iguais. Tente novamente.")
      return
    }

    let data = {
      password
    }

    await editPassword(data)
  }

  return (
    <>
    <Head>
      <title>Strix - Altere sua senha</title>
    </Head>

    <div className={styles.containerCenter}>
     
      <div className={styles.login}> 

        <Image src={logoImg} alt="Strix" />

        <form onSubmit={handlePassword}>
          <CustomizedInputs
            size='small' 
            type={'password'} 
            label={'Digite sua nova senha'} 
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={'password'} 
            label={'Confirmar senha'}
            value={passwordConfirm}
            onChange={ (e) => setPasswordConfirm(e.target.value) }
          />

          <Button type='submit'>Concluir</Button> 
        </form>

        <Link href="/" className={styles.text}>
          Login
        </Link>
      </div>
    </div>
    </>
  )
}
