import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import styles from '../../../styles/Home.module.scss';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { api } from '../../services/apiClient';

export default function EditStudent() {
  const [name, setName] = useState(''); 
  const [birthDate, setBirthdDate] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');

  const { idState } = useContext(AuthContext);// puxando do contexto

  async function detailStudentRequest(x){
    try{
      const response = await api.get('/student/detail', {
        params:{
          id: x,
        }
      });

      const { name, birthDate, phone, cpf, email } = response.data;
      setName(name);
      setBirthdDate(birthDate);
      setPhone(phone);
      setCpf(cpf);
      setEmail(email);
      console.log('detalhes pego com sucesso!')
    }catch(error){
      console.log('Erro ao tentar puxar os detalhes do aluno!')
    }
  }

  detailStudentRequest(idState);

  async function handleEditStudent(event){
    event.preventDefault();
  }
  
  return (
    <>
    <Head>
      <title>Strix - Edição de aluno</title>
    </Head>
    <Header />
    <div className={styles.containerCenterRegister}>
      <div className={styles.login}> 
        
        <Link href="/" className={styles.subtitulo}>
          Edição de aluno
        </Link>

        <form onSubmit={handleEditStudent}>
          <CustomizedInputs
            size='small' 
            label={'Nome Completo'} 
            type={'text'} 
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={"text"} 
            label={'Data de Nascimento'} 
            value={birthDate}
            onChange={ (e) => setBirthdDate(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={'text'} 
            label={'Telefone'} 
            value={phone}
            onChange={ (e) => setPhone(e.target.value) }
          />

          <CustomizedInputs
            size='small' 
            type={'text'} 
            label={'CPF'} 
            value={cpf}
            onChange={ (e) => setCpf(e.target.value) }
          />

          <CustomizedInputs 
            size='small' 
            type={'email'} 
            label={'email'} 
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <p className={styles.msg}>* Campo Obrigatório</p>
          <Button type='submit'>Salvar</Button> 
        </form>
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