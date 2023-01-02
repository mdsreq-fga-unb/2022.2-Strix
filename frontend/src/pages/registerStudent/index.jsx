import { useState, useContext } from 'react';
import Head from 'next/head';
import styles from '../../../styles/Home.module.scss';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';

export default function RegisterStudent() {
  const { registerStudent } = useContext(AuthContext);

  const [name, setName] = useState(''); 
  const [birthDate, setBirthdDate] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');

  async function handleRegisterStudent(event){
    event.preventDefault();

    if(name === '' || birthDate === '' || phone === '' || cpf === '' || email === '') {
      toast.error("Preencha os campos!");
      //alert('Preencha todos os campos!')
      return;
    }

    const user_id = "04b623b0-ccdb-4a32-8a6d-55e1b67ea038"; // Como só temos um usuário, esse id é único

      let data = {
        name,
        birthDate,
        phone,
        cpf,
        email,
        user_id
      }

      await registerStudent(data);
  }
  
  return (
    <>
    <Head>
      <title>Strix - Faça seu cadastro</title>
    </Head>
    <Header />
    <div className={styles.containerCenterRegister}>
      <div className={styles.login}> 
        
        <Link href="/" className={styles.subtitulo}>
          Cadastro de aluno
        </Link>

        <form onSubmit={handleRegisterStudent}>
          <CustomizedInputs
            size='small' 
            label={'Nome completo'} 
            type={'text'} 
            //required={true} 
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={"text"} 
            label={'Data de nascimento'} 
            // InputLabelProps={{
            //   shrink: true,
            // }}
            //required={true} 
            value={birthDate}
            onChange={ (e) => setBirthdDate(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={'text'} 
            label={'Telefone'} 
            //required={true} 
            value={phone}
            onChange={ (e) => setPhone(e.target.value) }
          />

          <CustomizedInputs
            size='small' 
            type={'text'} 
            label={'CPF'} 
            //required={true} 
            value={cpf}
            onChange={ (e) => setCpf(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={'email'} 
            label={'E-mail'} 
            //required={true} 
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

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

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
      props: {}
  }
})