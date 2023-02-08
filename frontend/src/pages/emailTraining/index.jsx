import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../../styles/Home.module.scss';
import CustomizedInputs from '../../components/ui/StyledInputs/CustomizedInputs';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { Header } from '../../components/Header';
//import { setupAPIClient } from '../../services/api';
import MenuItem from '@mui/material/MenuItem';
import Router from 'next/router';
import { api } from '../../services/apiClient';
import { setupAPIClient } from '../../services/api';

export default function EmailTraining({ students }) {
  const [emailUsername, setEmailUsername] = useState(''); 
  const [emailPassword, setEmailPassword] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [student, setStudent] = useState({});

  const { nameStudent } = useContext(AuthContext);

  useEffect(() => {
    for(let a = 0; a < students.length; a++){
      if(students[a].name === nameStudent){
        setStudent(students[a]);
        setStudentEmail(students[a].email);
      }
    }

  }, [])


  async function handleSendEmail(event){
    event.preventDefault();
    alert('enviado por email!');

    try {
      const response = await api.delete('/deleteFileRoot');
      console.log("Requisição feita com sucesso!");
    } catch (error) {
      console.log("Error ao fazer a requisição!", error);
    }
  }
  
  return (
    <>
    <Head>
      <title>Strix - Enviar treino</title>
    </Head>
    <Header />
    <div className={styles.containerCenterRegister}>
      <div className={styles.login}> 
        
        <Link href="/emailTraining" className={styles.subtitulo}>
          Enviar treino
        </Link>

        <form onSubmit={handleSendEmail}>
          <CustomizedInputs
            size='small' 
            label={'Email do usuário'} 
            type={'text'} 
            value={emailUsername}
            onChange={ (e) => setEmailUsername(e.target.value) }
          />

          <CustomizedInputs
            size='small' 
            label={'Senha do usuário'} 
            type={'text'} 
            value={emailPassword}
            onChange={ (e) => setEmailPassword(e.target.value) }
          />

          <CustomizedInputs
            size='small' 
            label={'Email do aluno'} 
            type={'text'} 
            value={studentEmail}
            onChange={ (e) => setStudentEmail(e.target.value) }
          />

          <Button type='submit'>Enviar</Button> 
        </form> 
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const responseStudents = await apiClient.get('/listStudents');
  return {
      props: {
        students: responseStudents.data
      }
  }
})